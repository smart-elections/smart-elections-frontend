import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './analyticsCard.scss';

const baseUrl = 'http://ec2-34-207-166-28.compute-1.amazonaws.com:8000';


function AnalyticsCard({ title, currentElectionsYear, electionsType, electionsRound }) {

    const [registeredVoters, setRegisteredVoters] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const { data: { data } } = await axios(`${baseUrl}/analytics/registered_voters?year=${currentElectionsYear}&round=${electionsRound}&type=${electionsType}`);
            setRegisteredVoters(data);
        }
        fetchData();
    }, [currentElectionsYear, electionsType, electionsRound]);

    return (
        <div className='analytics__card'>
            <div className='analytics__card__upper'>
                <div className='analytics__card__upper__title'>{title}</div>
                <div className='analytics__card__upper__comparison'>
                    {currentElectionsYear}
                </div>
            </div>
            <div className='analytics__card__lower'>
                <div className='analytics__card__lower__number'>
                    {registeredVoters}
                </div>
            </div>
        </div>
    );
}

export default AnalyticsCard;
