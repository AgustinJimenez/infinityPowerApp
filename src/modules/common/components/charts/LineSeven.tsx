import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { AreaChart } from 'react-native-svg-charts';
import { Svg, Circle, Path } from 'react-native-svg';

export interface DecoratorProps {
  x?: any;
  y?: any;
  data: Array<number>
}

const Decorator = ({ x, y, data }: DecoratorProps) => {
  return (
    <>
      {

        data.map((value, index) => {
          let fill = '#ccc';

          if( value > 50){
            fill = '#2FD315';
          } else if(value < 50){
            fill = '#FF003D';
          }

          return (
            <Svg key={index}>
              <Circle
                cx={x(index)}
                cy={y(value)}
                r={6}
                stroke={fill}
                fill={fill}
              />
            </Svg>
          );
        })
      }
    </>
  );
};


export interface LineProps {
  line?: string;
}

export const Line = ({ line }: LineProps) => (
  <Svg>
    <Path
      d={line}
      stroke={'white'}
      fill={'none'}
    />
  </Svg>
);

export interface ObjectiveCardProps {
  style?: StyleProp<ViewStyle>;
  data: Array<number>;
}

const LineSeven = ({ 
  style = {},
  data = []
}: ObjectiveCardProps) => {

  if (!data?.length) {
    return null;
  }

  return (
    <AreaChart
      style={[style, { height: 48 }]}
      data={data.map(d => d == 1 ? 100 : d == 0 ? 50 : 0)}
      contentInset={{ top: 10, bottom: 10, left: 10, right: 10 }}
      gridMin={0}
      gridMax={100}
    >
      <Line />
      <Decorator data={data} />
    </AreaChart>
  );
};

export default LineSeven;
