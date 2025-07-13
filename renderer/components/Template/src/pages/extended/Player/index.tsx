import Plyr from "plyr-react"
import "plyr-react/plyr.css"
import { PageBreadcrumb } from "../../../components"

interface videocontent {
  id: string,
  source: 'youtube' | 'vimeo',
}

const contents: videocontent[] = [
  {
    id: "PrUxWZiQfy4",
    source: "youtube"
  },
  {
    id: "693155895",
    source: "vimeo"
  }
]

const Player = () => {
  return (
    <>
      <PageBreadcrumb name='Player' title='Player' breadCrumbItems={["Konrix", "Extended", "Player"]} />
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        {(contents || []).map((video, idx) => {
          return (
            <div key={idx} className="card overflow-hidden">
              <div className="card-header">
                <div className="flex justify-between items-center">
                  <h4 className="card-title">{video.source.charAt(0).toUpperCase() + video.source.slice(1)} Player</h4>
                </div>
              </div>
              <div className="p-6">
                <div className="rounded-xl overflow-hidden">
                  <Plyr source={{
                    type: "video",
                    sources: [{
                      src: video.id,
                      provider: video.source,
                    }]
                  }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Player