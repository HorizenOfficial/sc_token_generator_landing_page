import React from "react"
import whiteCheck from "../../assets/white_check.png"

export enum ProgressStatus {
    CURRENT,
    DONE,
    NOT_DONE
}

export enum ConnectionSide {
    LEFT,
    CENTER,
    RIGHT
}

interface ProgressPointProps {
    status: ProgressStatus
    connectionSide: ConnectionSide
}

const ProgressPoint: React.FC<ProgressPointProps> = (
    {
        status,
        connectionSide
    }
) => {
    const progressPointSideClasses = connectionSide === ConnectionSide.LEFT ? "mr-auto" : "ml-auto"
    const progressPoint = () => {
        const commonClasses = "h-5 w-5 rounded-xl"
        switch (status) {
            case ProgressStatus.CURRENT:
                return (
                    <div
                        className={ commonClasses.concat(" bg-white border-[6.5px] border-ZBF_green ").concat(progressPointSideClasses) }/>
                )
            case ProgressStatus.NOT_DONE:
                return (
                    <div className={ commonClasses.concat("  bg-Gray_text ").concat(progressPointSideClasses) }/>
                )
            case ProgressStatus.DONE:
                return (
                    <div className={ commonClasses.concat(" bg-ZBF_green ").concat(progressPointSideClasses) }>
                        <img className="h-[0.9em] w-[0.9em] m-auto pt-[5px] object-contain" src={ whiteCheck }/>
                    </div>
                )
        }
    }

    const connectionClasses = "relative top-[0.4em] h-2 w-[calc(50%-0.5rem)] "
    if (connectionSide === ConnectionSide.LEFT) {
        const color = status === ProgressStatus.CURRENT || status === ProgressStatus.DONE ? "ZBF_green" : "Hover_bckgrnd"
        return (
            <>
                <div className={ `${ connectionClasses } bg-${ color }` }/>
                { progressPoint() }
            </>
        )
    } else if (connectionSide === ConnectionSide.RIGHT) {
        const color = status === ProgressStatus.CURRENT ? "Hover_bckgrnd" : "ZBF_green"
        return (
            <>
                { progressPoint() }
                <div className={ `${ connectionClasses }bg-${ color }` }/>
            </>
        )
    } else {
        const leftColor = status === ProgressStatus.CURRENT || status === ProgressStatus.DONE ? "ZBF_green" : "Hover_bckgrnd"
        const rightColor = status === ProgressStatus.CURRENT || status === ProgressStatus.NOT_DONE ? "Hover_bckgrnd" : "ZBF_green"
        return (
            <>
                <div className={ `${ connectionClasses }bg-${ leftColor }` }/>
                { progressPoint() }
                <div className={ `${ connectionClasses }bg-${ rightColor }` }/>
            </>
        )
    }
}

export default ProgressPoint