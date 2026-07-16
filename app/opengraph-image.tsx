import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #eef8fb 0%, #ffffff 55%)',
          color: '#0f172a',
          padding: '56px',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 26,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: '#0e7fa5',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 22,
            }}
          >
            S
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontWeight: 700, fontSize: 28 }}>Sewa2u</div>
            <div style={{ color: '#475569', fontSize: 18 }}>Malaysia Residential Rental Agreements</div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '2px solid #d8eef6',
            borderRadius: 24,
            background: '#ffffff',
            padding: '36px 40px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              width: 'fit-content',
              borderRadius: 999,
              background: '#d8eef6',
              color: '#0f6786',
              fontSize: 20,
              fontWeight: 600,
              padding: '8px 16px',
              marginBottom: 18,
            }}
          >
            Malaysia-focused
          </div>

          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, marginBottom: 16 }}>
            Tenancy agreement
            <br />
            done right, in minutes.
          </div>

          <div style={{ fontSize: 30, color: '#334155', lineHeight: 1.35, marginBottom: 22 }}>
            Generate a legally structured Malaysia residential tenancy agreement for
            <span style={{ color: '#0f172a', fontWeight: 700 }}> residential</span>,
            <span style={{ color: '#0f172a', fontWeight: 700 }}> private property</span>, or
            <span style={{ color: '#0f172a', fontWeight: 700 }}> room rental</span>.
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <div
              style={{
                borderRadius: 12,
                padding: '12px 20px',
                background: '#0e7fa5',
                color: '#fff',
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              Start agreement
            </div>
            <div
              style={{
                borderRadius: 12,
                padding: '12px 20px',
                border: '1px solid #cbd5e1',
                color: '#334155',
                fontWeight: 600,
                fontSize: 20,
              }}
            >
              See sample contract first
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
