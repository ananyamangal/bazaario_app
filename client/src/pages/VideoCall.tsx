import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Mic, MicOff, Video, VideoOff, PhoneOff, FlipHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock video call interface
export default function VideoCall() {
  const [, setLocation] = useLocation();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [status, setStatus] = useState("connecting"); // connecting, connected

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("connected");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleEndCall = () => {
    setLocation("/");
  };

  return (
    <div className="h-screen w-full bg-black relative overflow-hidden flex flex-col">
      {/* Remote Video (Full Screen) */}
      <div className="absolute inset-0 z-0">
         {/* Unsplash image representing shopkeeper view */}
         <img 
           src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?auto=format&fit=crop&q=80&w=800" 
           alt="Shopkeeper" 
           className="w-full h-full object-cover opacity-80"
         />
         {status === "connecting" && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white space-y-4">
              <div className="w-24 h-24 rounded-full border-4 border-primary/50 overflow-hidden mb-4 animate-pulse">
                <img src="https://pixabay.com/get/ga5d851cc906b8172ae6c7f489612bf16b72755a035def187ce85169f27e20500463c2021b3d528e6e83178f44a1c08d3416ea2191e1f7a5d07a88cfe169526ca_1280.jpg" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-bold">Connecting...</h2>
              <p className="text-white/60">Waiting for shopkeeper to join</p>
            </div>
         )}
      </div>

      {/* Local Video (PiP) */}
      {status === "connected" && (
        <div className="absolute top-4 right-4 w-28 h-40 bg-gray-800 rounded-xl overflow-hidden border-2 border-white/20 shadow-xl z-20">
          {!isVideoOff ? (
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white/50">
              <VideoOff className="w-8 h-8" />
            </div>
          )}
        </div>
      )}

      {/* Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 pt-24 bg-gradient-to-t from-black/90 to-transparent z-10 flex flex-col items-center">
        {status === "connected" && (
          <div className="flex items-center gap-6 mb-8">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isMuted ? 'bg-white text-black' : 'bg-white/20 backdrop-blur-md text-white'}`}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
            
            <button 
              onClick={handleEndCall}
              className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30 hover:bg-red-700 transition-all scale-110"
            >
              <PhoneOff className="w-8 h-8 fill-current" />
            </button>

            <button 
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isVideoOff ? 'bg-white text-black' : 'bg-white/20 backdrop-blur-md text-white'}`}
            >
              {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
            </button>
          </div>
        )}
        
        {status === "connecting" && (
          <Button 
             variant="destructive" 
             size="lg" 
             className="rounded-full w-full max-w-xs h-14 text-lg font-bold shadow-xl"
             onClick={handleEndCall}
          >
            Cancel Call
          </Button>
        )}
      </div>
    </div>
  );
}
