import React from 'react';
import { Text } from 'react-native';
import Card from 'src/modules/common/components/Card';
import CardTitle from 'src/modules/common/components/CardTitle';
import LineSeven from 'src/modules/common/components/charts/LineSeven';
import { ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { tw } from 'src/root/tw';

interface RightComponentProps {
  streakPercentage?: string;
  streakLabel?: string;
}

const style = tw`relative`
style.backgroundColor = "rgba(0, 0, 0, 0.5)"
style.borderRadius = 17
style.margin = 8

const RightComponent = ({ streakPercentage, streakLabel }: RightComponentProps) => {
  return (
    <Card style={tw`absolute -right-8 top-5 opacity-100`}>
      <ViewY spacing={0} style={tw`flex-grow`}>
        <Text style={tw`text-white text-lg font-bold`}>{streakPercentage}</Text>
        <Text style={tw`text-white text-xs`}>{streakLabel}</Text>
      </ViewY>
    </Card>
  );
};

interface ObjectiveCardProps {
  title?: string;
  footerDescription?: string;
  streakPercentage?: string;
  streakLabel?: string;
  dataToEvaluate: Array<number>;
}

const ObjectiveCard = ({
  title,
  footerDescription,
  streakPercentage,
  streakLabel,
  dataToEvaluate = [],
}: ObjectiveCardProps) => {
  return (
    <Card style={style}>
      <CardTitle
        title={title}
        RightComponent={() => <RightComponent streakPercentage={streakPercentage} streakLabel={streakLabel} />}>
        <LineSeven data={dataToEvaluate} style={tw`w-10/12`} />
      </CardTitle>
      {footerDescription && <Text style={tw`text-white text-xs`}>{footerDescription}</Text>}
    </Card>
  );
};

export default ObjectiveCard;
