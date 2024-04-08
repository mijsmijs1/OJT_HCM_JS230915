import pictures from "@/pictures"

import "./loading.scss"

export default function Loading() {
  return (
    <div className="loading_container">
      <img
        className="rotating-image"
        src={pictures.loading}
        alt="loading-icon"
      />
    </div>
  )
}
