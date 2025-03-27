"use client"

import { useState, useEffect, useRef } from "react"
import { useMockData } from "@/lib/context/mock-data-context"
import { Card } from "@/components/ui/card"
import { AlertCircle, Camera } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock video URLs for different exercises
const exerciseVideos = {
  squat: "/videos/squat-demo.mp4",
  deadlift: "/videos/deadlift-demo.mp4",
  "bench-press": "/videos/bench-press-demo.mp4",
  "shoulder-press": "/videos/shoulder-press-demo.mp4",
  rows: "/videos/rows-demo.mp4",
  lunges: "/videos/lunges-demo.mp4",
  "pull-ups": "/videos/pull-ups-demo.mp4",
  "push-ups": "/videos/push-ups-demo.mp4",
}

interface VideoPlayerProps {
  exerciseId: string
  isRecording: boolean
}

export function VideoPlayer({ exerciseId, isRecording }: VideoPlayerProps) {
  const { generateVideoAnalysis } = useMockData()
  const [videoStarted, setVideoStarted] = useState(false)
  const [showPosePoints, setShowPosePoints] = useState(false)
  const [posePoints, setPosePoints] = useState<any[]>([])
  const [showOverlay, setShowOverlay] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Calculate random dots to simulate pose detection points
  const generateRandomPosePoints = () => {
    // Generate 33 points (MediaPipe pose has 33 keypoints)
    const points = []
    // Create torso/head points
    for (let i = 0; i < 10; i++) {
      points.push({
        x: 50 + Math.random() * 25 - 12.5,  // Center with some randomness
        y: 30 + i * 4 + Math.random() * 4 - 2, // Spaced vertically with randomness
        confidence: Math.random() * 0.2 + 0.8, // High confidence 0.8-1.0
      })
    }
    
    // Create arms points (left)
    for (let i = 0; i < 5; i++) {
      points.push({
        x: 38 - i * 3 + Math.random() * 4 - 2,
        y: 38 + i * 4 + Math.random() * 4 - 2,
        confidence: Math.random() * 0.3 + 0.7,
      })
    }
    
    // Create arms points (right)
    for (let i = 0; i < 5; i++) {
      points.push({
        x: 62 + i * 3 + Math.random() * 4 - 2,
        y: 38 + i * 4 + Math.random() * 4 - 2,
        confidence: Math.random() * 0.3 + 0.7,
      })
    }
    
    // Create legs points (left)
    for (let i = 0; i < 6; i++) {
      points.push({
        x: 45 - i * 1 + Math.random() * 3 - 1.5,
        y: 60 + i * 5 + Math.random() * 3 - 1.5,
        confidence: Math.random() * 0.3 + 0.7,
      })
    }
    
    // Create legs points (right)
    for (let i = 0; i < 6; i++) {
      points.push({
        x: 55 + i * 1 + Math.random() * 3 - 1.5,
        y: 60 + i * 5 + Math.random() * 3 - 1.5,
        confidence: Math.random() * 0.3 + 0.7,
      })
    }
    
    return points
  }

  useEffect(() => {
    if (isRecording) {
      setVideoStarted(true)
      setShowPosePoints(true)
      
      // Generate initial pose points
      setPosePoints(generateRandomPosePoints())
      
      // Simulate MediaPipe detection by updating pose points regularly
      const interval = setInterval(() => {
        // Small movement on each update to simulate motion
        setPosePoints(prevPoints => 
          prevPoints.map(point => ({
            x: point.x + (Math.random() * 1 - 0.5),
            y: point.y + (Math.random() * 1 - 0.5),
            confidence: Math.min(1, Math.max(0.6, point.confidence + (Math.random() * 0.1 - 0.05)))
          }))
        )
      }, 150)
      
      return () => clearInterval(interval)
    } else {
      // Small delay before hiding points when recording stops
      if (showPosePoints) {
        const timeout = setTimeout(() => {
          setShowPosePoints(false)
        }, 500)
        return () => clearTimeout(timeout)
      }
    }
  }, [isRecording])

  // Effect for actually playing the video
  useEffect(() => {
    if (videoStarted && videoRef.current) {
      if (isRecording) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [videoStarted, isRecording])

  // Simulated camera feed 
  const getVideoSourceForExercise = () => {
    // In a real app, we'd have different videos for each exercise
    // Here, we just use a static video
    if (exerciseId.includes('cricket')) {
      return "/videos/cricket-demo.mp4"
    } else if (exerciseId.includes('football')) {
      return "/videos/football-demo.mp4"
    } else {
      return "/videos/athletics-demo.mp4"
    }
  }

  // Simulate user clicking to start camera
  const handleStartCamera = () => {
    setVideoStarted(true)
    // Fetch dummy analysis results
    generateVideoAnalysis()
  }

  return (
    <div className="relative bg-gray-900 rounded-md overflow-hidden" style={{ aspectRatio: "16/9" }}>
      {!videoStarted ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 text-white">
          <Camera className="h-12 w-12 mb-4" />
          <div className="text-center mb-4">
            <h3 className="text-lg font-medium">Camera Feed</h3>
            <p className="text-sm text-gray-300">Click to access your camera</p>
          </div>
          <button 
            onClick={handleStartCamera}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Start Camera
          </button>
        </div>
      ) : (
        <>
          <video 
            ref={videoRef}
            className="w-full h-full object-cover"
            src={getVideoSourceForExercise()}
            loop
            muted
          />
          
          {/* Pose estimation overlay */}
          {showPosePoints && (
            <div className="absolute inset-0 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Draw pose skeleton connecting lines */}
                <g stroke="#00A6FB" strokeWidth="0.3" opacity="0.8">
                  {/* Connect head to shoulders */}
                  {posePoints[0] && posePoints[1] && (
                    <line 
                      x1={posePoints[0].x} 
                      y1={posePoints[0].y} 
                      x2={posePoints[1].x} 
                      y2={posePoints[1].y} 
                    />
                  )}
                  
                  {/* Torso connections */}
                  {posePoints.slice(1, 5).map((point, i) => (
                    posePoints[i + 2] && (
                      <line 
                        key={`torso-${i}`}
                        x1={point.x} 
                        y1={point.y} 
                        x2={posePoints[i + 2].x} 
                        y2={posePoints[i + 2].y} 
                      />
                    )
                  ))}
                  
                  {/* Arms */}
                  {posePoints[2] && posePoints[10] && (
                    <line 
                      x1={posePoints[2].x} 
                      y1={posePoints[2].y} 
                      x2={posePoints[10].x} 
                      y2={posePoints[10].y} 
                    />
                  )}
                  
                  {posePoints[5] && posePoints[15] && (
                    <line 
                      x1={posePoints[5].x} 
                      y1={posePoints[5].y} 
                      x2={posePoints[15].x} 
                      y2={posePoints[15].y} 
                    />
                  )}
                  
                  {/* Left arm connections */}
                  {posePoints.slice(10, 14).map((point, i) => (
                    posePoints[i + 11] && (
                      <line 
                        key={`left-arm-${i}`}
                        x1={point.x} 
                        y1={point.y} 
                        x2={posePoints[i + 11].x} 
                        y2={posePoints[i + 11].y} 
                      />
                    )
                  ))}
                  
                  {/* Right arm connections */}
                  {posePoints.slice(15, 19).map((point, i) => (
                    posePoints[i + 16] && (
                      <line 
                        key={`right-arm-${i}`}
                        x1={point.x} 
                        y1={point.y} 
                        x2={posePoints[i + 16].x} 
                        y2={posePoints[i + 16].y} 
                      />
                    )
                  ))}
                  
                  {/* Legs connections */}
                  {posePoints[5] && posePoints[20] && (
                    <line 
                      x1={posePoints[5].x} 
                      y1={posePoints[5].y} 
                      x2={posePoints[20].x} 
                      y2={posePoints[20].y} 
                    />
                  )}
                  
                  {posePoints[5] && posePoints[26] && (
                    <line 
                      x1={posePoints[5].x} 
                      y1={posePoints[5].y} 
                      x2={posePoints[26].x} 
                      y2={posePoints[26].y} 
                    />
                  )}
                  
                  {/* Left leg connections */}
                  {posePoints.slice(20, 25).map((point, i) => (
                    posePoints[i + 21] && (
                      <line 
                        key={`left-leg-${i}`}
                        x1={point.x} 
                        y1={point.y} 
                        x2={posePoints[i + 21].x} 
                        y2={posePoints[i + 21].y} 
                      />
                    )
                  ))}
                  
                  {/* Right leg connections */}
                  {posePoints.slice(26, 31).map((point, i) => (
                    posePoints[i + 27] && (
                      <line 
                        key={`right-leg-${i}`}
                        x1={point.x} 
                        y1={point.y} 
                        x2={posePoints[i + 27].x} 
                        y2={posePoints[i + 27].y} 
                      />
                    )
                  ))}
                </g>
                
                {/* Draw detected points */}
                {posePoints.map((point, index) => (
                  <circle 
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r={index < 5 ? 0.7 : 0.5} // Larger points for main body
                    fill={point.confidence > 0.8 ? "#22C55E" : "#F59E0B"}
                    opacity={point.confidence}
                  />
                ))}
              </svg>
            </div>
          )}
          
          {/* Overlay information like FPS, detection status */}
          {showOverlay && (
            <div className="absolute bottom-2 left-2 right-2 flex justify-between text-xs bg-black/50 text-white p-1 rounded">
              <div className="flex items-center">
                <div className={cn(
                  "h-2 w-2 rounded-full mr-1",
                  isRecording ? "bg-green-500 animate-pulse" : "bg-red-500"
                )} />
                <span>{isRecording ? "Recording" : "Paused"}</span>
              </div>
              <div>
                {isRecording ? "MediaPipe tracking active" : "Tracking inactive"}
              </div>
              <div>FPS: {isRecording ? "24" : "0"}</div>
            </div>
          )}
          
          {/* Issue warning if recording and exerciseId includes cricket_bowling */}
          {isRecording && exerciseId.includes('cricket_bowling') && (
            <div className="absolute top-2 right-2 bg-yellow-500/90 text-black px-2 py-1 rounded-md text-xs flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              Check elbow position
            </div>
          )}
        </>
      )}
    </div>
  )
} 