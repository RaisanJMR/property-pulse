'use client'
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { fetchPropery } from "@/utils/requests"

const page = () => {

    const { id } = useParams()
    const [property, setProperty] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchPropertyData = async () => {
            if (!id) return
            try {
                const property = await fetchPropery(id)
                setProperty(property)
            } catch (error) {
                console.error('Error fetching property:', error)
            } finally {
                setLoading(false)
            }
        }
        if (property === null) {
            fetchPropertyData()
        }
    }, [id, property])

    return (
        <div>{id}</div>
    )
}

export default page