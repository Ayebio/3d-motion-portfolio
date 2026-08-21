import * as React from "react"

interface VideoPlayerProps {
  title: string
  videoSrc?: string
  posterUrl: string
}

export function VideoPlayer({ title, videoSrc, posterUrl }: VideoPlayerProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-border/80 shadow-2xl">
      {videoSrc ? (
        <video
          src={videoSrc}
          controls
          playsInline
          preload="metadata"
          poster={posterUrl}
          className="h-full w-full object-contain bg-black"
        >
          您的浏览器不支持 HTML5 视频播放。
        </video>
      ) : (
        <img
          src={posterUrl}
          alt={title}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  )
}
