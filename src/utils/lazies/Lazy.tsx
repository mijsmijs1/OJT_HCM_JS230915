import { lazy, Suspense } from "react"
import Loading from "./components/Loading"

export const LazyLoad = (importFunc: any, access: boolean = true, fallback: string | null = null) => {

  // set timeout for load
  const LazyComponent = lazy(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(importFunc())
      }, 1000)
    })
  })

  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  )
}
