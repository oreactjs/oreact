/**
 * https://github.com/siddharthkp/use-timeout
 * license: MIT © siddharthkp/https://github.com/siddharthkp
 */
import { useEffect, useRef } from 'react'

function useTimeout(callback, delay) {
    const savedCallback = useRef()

    // Remember the latest callback.
    useEffect(
        () => {
            savedCallback.current = callback
        },
        [callback]
    )

    // Set up the interval.
    useEffect(
        () => {
            function tick() {
                savedCallback.current()
            }
            if (delay !== null) {
                const id = setTimeout(tick, delay)
                return () => clearTimeout(id)
            }
        },
        [delay]
    )
}

export default useTimeout
