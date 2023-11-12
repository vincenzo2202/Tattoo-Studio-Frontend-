import React from 'react';
import './ShiftToggle.css';

const ShiftToggle = ({ selectedShift, onShiftChange  }) => {
    const shiftOptions = ["morning", "afternoon"];

    return (
        <div className="inputDesign">
            <label htmlFor="shift"></label>
            <select
                className="shift-toggle-select"
                name="shift"
                value={selectedShift}
                onChange={(e) => onShiftChange(e.target.value)}
            >
                <option value="" disabled>Select shift</option>
                {shiftOptions.map((option) => (
                    <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                ))}
            </select> 
        </div>
    );
};

export default ShiftToggle;