'use client';
import { useState } from 'react'
const ProfileProperties = ({ properties: initProperties }) => {
    const [properties, setProperties] = useState(initProperties)
    return (
        <div>ProfileProperties</div>
    )
}

export default ProfileProperties