import React from 'react'
import '@/assets/styles/globals.css';

export const metadata = {
    title: 'PropertyPulse | Find The Perfect Rental',
    decsription: 'Find Your Dream Rental Property',
    keywords: 'rental, find rentals, find properties'
}

const MainLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <div>{children}</div>
            </body>
        </html>
    )
}

export default MainLayout