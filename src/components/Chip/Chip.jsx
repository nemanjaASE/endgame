import React from "react"
import "./Chip.css"

const Chip = ({ className, languageObj }) => {
    const styles = {
        backgroundColor: languageObj.backgroundColor,
        color: languageObj.color
    }

    return (
        <span className={className} style={styles}>
            {languageObj.name}
        </span>
    )
}

export default Chip