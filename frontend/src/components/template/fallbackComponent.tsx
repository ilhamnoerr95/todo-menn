import React from "react"
import Custom404 from "@/pages/404"
type FallbackProps = {
	error?: any
	resetErrorBoundary?: (...args: any[]) => void
}

const fallbackComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
	// Call resetErrorBoundary() to reset the error boundary and retry the render.
	return (
		<>{error.message === 400 ? <Custom404 /> : <div>fallbackComponent</div>}</>
	)
}

export default fallbackComponent
