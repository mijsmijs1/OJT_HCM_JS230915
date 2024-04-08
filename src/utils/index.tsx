import { lazy, Suspense } from "react"

import Loading from '@/lazy_loading'

const lazyFn = (importFunc: any) => {
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
export default lazyFn