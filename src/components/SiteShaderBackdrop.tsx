import { useEffect, useRef, useState } from 'react'

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const SCENE_FRAGMENT_SHADER_SOURCE = `
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_feedback;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec2 u_mouse_velocity;
uniform float u_dpr;
uniform float u_intensity;
uniform float u_scroll;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rotation = mat2(0.8, -0.6, 0.6, 0.8);

  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = rotation * p * 2.04 + 8.7;
    amplitude *= 0.52;
  }

  return value;
}

vec2 flowField(vec2 p, float t) {
  float a = fbm(p * 1.25 + vec2(t * 0.32, -t * 0.21));
  float b = fbm(p * 1.25 + vec2(-t * 0.18 + 9.2, t * 0.27 - 4.1));
  float angle = (a - b) * 6.2831853;
  return vec2(cos(angle), sin(angle));
}

vec3 feedbackSample(vec2 uv, vec2 flowA, vec2 flowB, vec2 velocity, float velocityStrength) {
  vec2 texel = 1.0 / max(u_resolution.xy, vec2(1.0));
  vec2 drift = flowA * 0.0045 + flowB * 0.0026 + velocity * 0.026 * velocityStrength;
  vec2 sampleUv = clamp(uv + drift, vec2(0.001), vec2(0.999));

  vec3 center = texture2D(u_feedback, sampleUv).rgb;
  vec3 blur = (
    texture2D(u_feedback, sampleUv + vec2(texel.x, 0.0) * 1.6).rgb +
    texture2D(u_feedback, sampleUv - vec2(texel.x, 0.0) * 1.6).rgb +
    texture2D(u_feedback, sampleUv + vec2(0.0, texel.y) * 1.6).rgb +
    texture2D(u_feedback, sampleUv - vec2(0.0, texel.y) * 1.6).rgb
  ) * 0.25;

  return mix(center, blur, 0.2 + velocityStrength * 0.12) * 0.972;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
  vec2 mouse = (u_mouse - 0.5 * u_resolution.xy) / u_resolution.y;
  vec2 velocity = u_mouse_velocity / max(u_resolution.y, 1.0);
  float velocityStrength = smoothstep(0.0, 0.065, length(velocity));
  float scroll = u_scroll * 0.00034;

  float t = u_time * 0.09;
  vec2 scrollFlow = vec2(sin(scroll * 1.7) * 0.16, scroll);
  vec2 flowA = flowField(p * 1.15 + scrollFlow * 0.34, t);
  vec2 flowB = flowField(p * 2.1 - scrollFlow * 0.22 + flowA * 0.35, t * 1.34);
  vec2 velocityWake = velocity * 1.7 * smoothstep(0.7, 0.0, length(p - mouse));
  vec2 warped = p + flowA * 0.22 + flowB * 0.11 + velocityWake;
  vec2 drift = vec2(t * 0.26, -t * 0.19) + scrollFlow;
  float distortion = fbm(warped * 1.55 + drift);
  float smokeA = fbm(warped * 2.15 + drift + distortion * 0.78);
  float smokeB = fbm(warped * 4.8 - drift * 1.4 + mouse * 0.4 + flowB * 0.25);
  float smokeC = fbm(warped * 7.2 + flowA * 0.5 - vec2(t * 0.44, t * 0.18));
  float smoke = smoothstep(0.16, 1.1, smokeA * 0.62 + smokeB * 0.36 + smokeC * 0.24);
  float filament = pow(smoothstep(0.48, 1.1, smokeB * 0.65 + smokeC * 0.58), 1.55);

  float distanceToMouse = length(p - mouse);
  float broadGlow = smoothstep(0.72, 0.0, distanceToMouse);
  float reveal = smoothstep(0.32, 0.0, distanceToMouse);
  float core = smoothstep(0.12, 0.0, distanceToMouse);
  float wake = smoothstep(0.52, 0.0, length(p - mouse + velocity * 1.8)) * velocityStrength;
  vec2 wakeDirection = normalize(velocity + vec2(0.0001));
  float wakeSlice = abs(dot(p - mouse, vec2(-wakeDirection.y, wakeDirection.x)));
  float wakeTrail = smoothstep(0.18, 0.0, wakeSlice) *
    smoothstep(0.82, 0.0, length(p - mouse + velocity * 2.4)) *
    velocityStrength;

  float rightField = smoothstep(-0.72, 0.88, p.x) * smoothstep(-1.0, 0.62, p.y + scroll * 0.12);
  float leftField = smoothstep(0.86, -0.72, p.x) * smoothstep(0.74, -0.85, p.y - scroll * 0.08);
  float stream = smoothstep(0.2, 0.92, smokeA + smokeC * 0.35) * (0.45 + 0.55 * smoke);
  float field = smoke * (0.18 + rightField * 0.44 + leftField * 0.22 + broadGlow * 0.44 + wake * 0.28);

  vec3 base = vec3(0.014, 0.017, 0.018);
  vec3 deepBlue = vec3(0.02, 0.12, 0.18);
  vec3 cyan = vec3(0.18, 0.75, 0.95);
  vec3 whiteCyan = vec3(0.68, 0.94, 1.0);

  vec3 previous = feedbackSample(uv, flowA, flowB, velocity, velocityStrength);
  vec3 feedbackEnergy = max(previous - base * 0.68, vec3(0.0));

  vec3 fresh = base;
  fresh += deepBlue * field * 1.46;
  fresh += deepBlue * stream * 0.24;
  fresh += cyan * (broadGlow * smoke * 0.16 + reveal * 0.13 + wake * 0.18) * u_intensity;
  fresh += cyan * (filament * 0.05 + wakeTrail * 0.08) * u_intensity;
  fresh += whiteCyan * (core * core * 0.12 + wake * wake * 0.08) * u_intensity;

  float ambientA = smoothstep(1.2, 0.05, length(p - vec2(0.44, 0.16 + scroll * 0.2)));
  float ambientB = smoothstep(1.28, 0.06, length(p - vec2(-0.52, -0.22 - scroll * 0.12)));
  fresh += vec3(0.02, 0.16, 0.21) * ambientA * 0.28;
  fresh += vec3(0.01, 0.1, 0.14) * ambientB * 0.2;

  vec3 color = fresh + feedbackEnergy * (0.46 + velocityStrength * 0.16);
  color = max(color, previous * 0.74);

  float vignette = smoothstep(0.92, 0.2, length(uv - vec2(0.5)));
  color *= 0.5 + vignette * 0.68;

  float grain = (hash(gl_FragCoord.xy / max(u_dpr, 1.0) + u_time) - 0.5) * 0.014;
  color += grain;
  color = clamp(color, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}
`

const DISPLAY_FRAGMENT_SHADER_SOURCE = `
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_texture;
uniform vec2 u_resolution;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = texture2D(u_texture, uv).rgb;
  float vignette = smoothstep(0.98, 0.12, length(uv - vec2(0.5)));
  color *= 0.72 + vignette * 0.36;
  color += (hash(gl_FragCoord.xy) - 0.5) * 0.006;
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`

const FULLSCREEN_TRIANGLE = new Float32Array([-1, -1, 3, -1, -1, 3])

type RenderTarget = {
  framebuffer: WebGLFramebuffer
  texture: WebGLTexture
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
  label: string,
) {
  const shader = gl.createShader(type)

  if (!shader) {
    return null
  }

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(`Site shader ${label} compile failed:`, gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }

  return shader
}

function createProgram(
  gl: WebGLRenderingContext,
  fragmentSource: string,
  label: string,
) {
  const vertexShader = compileShader(
    gl,
    gl.VERTEX_SHADER,
    VERTEX_SHADER_SOURCE,
    `${label} vertex`,
  )
  const fragmentShader = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentSource,
    `${label} fragment`,
  )

  if (!vertexShader || !fragmentShader) {
    if (vertexShader) {
      gl.deleteShader(vertexShader)
    }

    if (fragmentShader) {
      gl.deleteShader(fragmentShader)
    }

    return null
  }

  const program = gl.createProgram()

  if (!program) {
    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)
    return null
  }

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  gl.deleteShader(vertexShader)
  gl.deleteShader(fragmentShader)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(`Site shader ${label} link failed:`, gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
    return null
  }

  return program
}

function createRenderTarget(
  gl: WebGLRenderingContext,
  width: number,
  height: number,
) {
  const texture = gl.createTexture()
  const framebuffer = gl.createFramebuffer()

  if (!texture || !framebuffer) {
    if (texture) {
      gl.deleteTexture(texture)
    }

    if (framebuffer) {
      gl.deleteFramebuffer(framebuffer)
    }

    return null
  }

  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    width,
    height,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    null,
  )

  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0,
  )

  if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
    gl.deleteTexture(texture)
    gl.deleteFramebuffer(framebuffer)
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    return null
  }

  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)

  return { framebuffer, texture }
}

function deleteRenderTarget(
  gl: WebGLRenderingContext,
  target: RenderTarget | null,
) {
  if (!target) {
    return
  }

  gl.deleteFramebuffer(target.framebuffer)
  gl.deleteTexture(target.texture)
}

function canRunAnimatedShader() {
  return (
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(max-width: 767px)').matches
  )
}

function SiteShaderBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canAnimate, setCanAnimate] = useState(false)
  const [isShaderActive, setIsShaderActive] = useState(false)

  useEffect(() => {
    const queries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(pointer: fine)'),
      window.matchMedia('(max-width: 767px)'),
    ]
    const updateAvailability = () => {
      const nextCanAnimate = canRunAnimatedShader()

      setCanAnimate(nextCanAnimate)

      if (!nextCanAnimate) {
        setIsShaderActive(false)
      }
    }

    updateAvailability()
    queries.forEach((query) => {
      query.addEventListener('change', updateAvailability)
    })

    return () => {
      queries.forEach((query) => {
        query.removeEventListener('change', updateAvailability)
      })
    }
  }, [])

  useEffect(() => {
    if (!canAnimate) {
      return
    }

    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: 'high-performance',
      stencil: false,
    })

    if (!gl) {
      return
    }

    const sceneProgram = createProgram(gl, SCENE_FRAGMENT_SHADER_SOURCE, 'scene')
    const displayProgram = createProgram(
      gl,
      DISPLAY_FRAGMENT_SHADER_SOURCE,
      'display',
    )
    const buffer = gl.createBuffer()

    if (!sceneProgram || !displayProgram || !buffer) {
      if (sceneProgram) {
        gl.deleteProgram(sceneProgram)
      }

      if (displayProgram) {
        gl.deleteProgram(displayProgram)
      }

      return
    }

    const scenePositionLocation = gl.getAttribLocation(
      sceneProgram,
      'a_position',
    )
    const displayPositionLocation = gl.getAttribLocation(
      displayProgram,
      'a_position',
    )
    const feedbackLocation = gl.getUniformLocation(sceneProgram, 'u_feedback')
    const timeLocation = gl.getUniformLocation(sceneProgram, 'u_time')
    const resolutionLocation = gl.getUniformLocation(sceneProgram, 'u_resolution')
    const mouseLocation = gl.getUniformLocation(sceneProgram, 'u_mouse')
    const mouseVelocityLocation = gl.getUniformLocation(
      sceneProgram,
      'u_mouse_velocity',
    )
    const dprLocation = gl.getUniformLocation(sceneProgram, 'u_dpr')
    const intensityLocation = gl.getUniformLocation(sceneProgram, 'u_intensity')
    const scrollLocation = gl.getUniformLocation(sceneProgram, 'u_scroll')
    const displayTextureLocation = gl.getUniformLocation(
      displayProgram,
      'u_texture',
    )
    const displayResolutionLocation = gl.getUniformLocation(
      displayProgram,
      'u_resolution',
    )

    if (
      scenePositionLocation < 0 ||
      displayPositionLocation < 0 ||
      !feedbackLocation ||
      !timeLocation ||
      !resolutionLocation ||
      !mouseLocation ||
      !mouseVelocityLocation ||
      !dprLocation ||
      !intensityLocation ||
      !scrollLocation ||
      !displayTextureLocation ||
      !displayResolutionLocation
    ) {
      gl.deleteBuffer(buffer)
      gl.deleteProgram(sceneProgram)
      gl.deleteProgram(displayProgram)
      return
    }

    let width = 1
    let height = 1
    let dpr = 1
    let frameId = 0
    let isRunning = true
    let readTarget: RenderTarget | null = null
    let writeTarget: RenderTarget | null = null
    let targetIntensity = 0.36
    let currentIntensity = 0.36
    let targetScroll = window.scrollY
    let currentScroll = targetScroll
    const targetMouse = { x: 0, y: 0 }
    const currentMouse = { x: 0, y: 0 }
    const targetMouseVelocity = { x: 0, y: 0 }
    const currentMouseVelocity = { x: 0, y: 0 }
    const lastMouse = { x: 0, y: 0 }
    let lastMouseTime = performance.now()
    const startedAt = performance.now()

    gl.disable(gl.DEPTH_TEST)
    gl.disable(gl.BLEND)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, FULLSCREEN_TRIANGLE, gl.STATIC_DRAW)

    const bindFullscreenTriangle = (
      program: WebGLProgram,
      positionLocation: number,
    ) => {
      gl.useProgram(program)
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.enableVertexAttribArray(positionLocation)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
    }

    const recreateRenderTargets = () => {
      deleteRenderTarget(gl, readTarget)
      deleteRenderTarget(gl, writeTarget)

      readTarget = createRenderTarget(gl, width, height)
      writeTarget = createRenderTarget(gl, width, height)

      if (!readTarget || !writeTarget) {
        deleteRenderTarget(gl, readTarget)
        deleteRenderTarget(gl, writeTarget)
        readTarget = null
        writeTarget = null
        return false
      }

      return true
    }

    const stopShader = () => {
      isRunning = false
      window.cancelAnimationFrame(frameId)
      setIsShaderActive(false)
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const nextDpr = Math.min(window.devicePixelRatio || 1, 1.65)
      const nextWidth = Math.max(1, Math.floor(rect.width * nextDpr))
      const nextHeight = Math.max(1, Math.floor(rect.height * nextDpr))
      const sizeChanged = canvas.width !== nextWidth || canvas.height !== nextHeight

      dpr = nextDpr
      width = nextWidth
      height = nextHeight

      if (sizeChanged) {
        canvas.width = width
        canvas.height = height

        if (!recreateRenderTargets()) {
          return false
        }
      }

      if (targetMouse.x === 0 && targetMouse.y === 0) {
        targetMouse.x = width * 0.62
        targetMouse.y = height * 0.58
        currentMouse.x = targetMouse.x
        currentMouse.y = targetMouse.y
      }

      gl.viewport(0, 0, width, height)
      return true
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        return
      }

      const nextX = event.clientX * dpr
      const nextY = (window.innerHeight - event.clientY) * dpr
      const now = performance.now()
      const elapsed = Math.max(16, now - lastMouseTime)

      targetMouseVelocity.x = ((nextX - lastMouse.x) / elapsed) * 16
      targetMouseVelocity.y = ((nextY - lastMouse.y) / elapsed) * 16
      targetMouse.x = nextX
      targetMouse.y = nextY
      lastMouse.x = nextX
      lastMouse.y = nextY
      lastMouseTime = now
      targetIntensity = 0.78
    }

    const handlePointerLeave = () => {
      targetIntensity = 0.32
    }

    const handleScroll = () => {
      targetScroll = window.scrollY
    }

    const handleContextLost = (event: Event) => {
      event.preventDefault()
      stopShader()
    }

    const render = (now: number) => {
      if (!isRunning || !readTarget || !writeTarget) {
        return
      }

      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.075
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.075
      currentMouseVelocity.x +=
        (targetMouseVelocity.x - currentMouseVelocity.x) * 0.09
      currentMouseVelocity.y +=
        (targetMouseVelocity.y - currentMouseVelocity.y) * 0.09
      targetMouseVelocity.x *= 0.92
      targetMouseVelocity.y *= 0.92
      currentIntensity += (targetIntensity - currentIntensity) * 0.045
      currentScroll += (targetScroll - currentScroll) * 0.08

      gl.bindFramebuffer(gl.FRAMEBUFFER, writeTarget.framebuffer)
      gl.viewport(0, 0, width, height)
      bindFullscreenTriangle(sceneProgram, scenePositionLocation)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, readTarget.texture)
      gl.uniform1i(feedbackLocation, 0)
      gl.uniform1f(timeLocation, (now - startedAt) / 1000)
      gl.uniform2f(resolutionLocation, width, height)
      gl.uniform2f(mouseLocation, currentMouse.x, currentMouse.y)
      gl.uniform2f(
        mouseVelocityLocation,
        currentMouseVelocity.x,
        currentMouseVelocity.y,
      )
      gl.uniform1f(dprLocation, dpr)
      gl.uniform1f(intensityLocation, currentIntensity)
      gl.uniform1f(scrollLocation, currentScroll)
      gl.drawArrays(gl.TRIANGLES, 0, 3)

      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.viewport(0, 0, width, height)
      bindFullscreenTriangle(displayProgram, displayPositionLocation)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, writeTarget.texture)
      gl.uniform1i(displayTextureLocation, 0)
      gl.uniform2f(displayResolutionLocation, width, height)
      gl.drawArrays(gl.TRIANGLES, 0, 3)

      const previousReadTarget = readTarget
      readTarget = writeTarget
      writeTarget = previousReadTarget
      frameId = window.requestAnimationFrame(render)
    }

    if (!resize()) {
      gl.deleteBuffer(buffer)
      gl.deleteProgram(sceneProgram)
      gl.deleteProgram(displayProgram)
      return
    }

    const resizeObserver = new ResizeObserver(() => {
      if (!resize()) {
        stopShader()
      }
    })
    resizeObserver.observe(canvas)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.documentElement.addEventListener('mouseleave', handlePointerLeave)
    canvas.addEventListener('webglcontextlost', handleContextLost)

    setIsShaderActive(true)
    frameId = window.requestAnimationFrame(render)

    return () => {
      isRunning = false
      window.cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('scroll', handleScroll)
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave)
      canvas.removeEventListener('webglcontextlost', handleContextLost)
      deleteRenderTarget(gl, readTarget)
      deleteRenderTarget(gl, writeTarget)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(sceneProgram)
      gl.deleteProgram(displayProgram)
    }
  }, [canAnimate])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_68%_24%,rgba(64,194,255,0.16),transparent_30%),radial-gradient(circle_at_18%_42%,rgba(38,123,166,0.13),transparent_34%),linear-gradient(180deg,#080909_0%,#050505_100%)]"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
          isShaderActive ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,transparent,rgba(0,0,0,0.32)_74%)]" />
    </div>
  )
}

export default SiteShaderBackdrop
