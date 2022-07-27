import React from 'react';
import './analyticsCard.scss';

function AnalyticsCard({ title, number, percentage, color }) {
    return (
        <div className={color === 'white' ? 'analytics__card' : 'analytics__card__green'}>
            <div className={color === 'white' ? 'analytics__card__upper' : 'analytics__card__green__upper'}>
                <div className={color === 'white' ? 'analytics__card__upper__title' : 'analytics__card__green__upper__title'}>{title}</div>
                <div className={color === 'white' ? percentage > 0 ? 'analytics__card__upper__comparison--increase' : 'analytics__card__upper__comparison--decrease' : 'analytics__card__green__upper__comparison'}>
                    {percentage === 'No previous elections' ? '' : percentage > 0 ? '+' + `${percentage} %` : '' + `${percentage} %`}
                </div>
            </div>
            <div className={color === 'white' ? 'analytics__card__lower' : 'analytics__card__green__lower'}>
                <div className={color === 'white' ? 'analytics__card__lower__number' : 'analytics__card__green__lower__number'}>
                    {number}
                </div>
            </div>
        </div>
    );
}

export default AnalyticsCard;
