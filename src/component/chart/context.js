import React from 'react';
import EChart from '@component/chart';

export const ChartContext = React.createContext(
    {
        resize: false,
    }
);

export const MChart = props => (
    <ChartContext.Consumer>
        {resize => (
            <EChart
                {...props}
                resize
            />
        )}
    </ChartContext.Consumer>
);