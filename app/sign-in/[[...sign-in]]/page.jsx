
import { SignIn } from '@clerk/nextjs'
import { assets } from '@/Assets/assets'
export default function Page() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ 
              backgroundImage: `url(${assets.auth.src})`,
       }} 
    >
      <SignIn
        appearance={{
          elements: {
            card: "backdrop-blur bg-white/70 shadow-xl border border-gray-200",
          },
        }}
      />
    </div>
  )
}