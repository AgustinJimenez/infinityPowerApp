import React from 'react';
import { Text, TextInput } from 'react-native';
import { ViewX, ViewY } from './utils/ViewUtils';
import tw from 'twrnc';




export interface CartTitleProps {
	children?: React.ReactNode;
	title?: string;
	description?: string;
	info?: string;
	LeftComponent?: React.FC;
	RightComponent?: React.FC;
}


const CardTitle = ({
	children,
	title,
	description,
	info,
	LeftComponent,
	RightComponent
}: CartTitleProps) => {
	return (
		<ViewX spacing={4}>
			{!!LeftComponent && <LeftComponent />}
			<ViewY spacing={4} style={tw`flex-grow`}>
				<ViewY spacing={0} style={tw`flex-grow justify-center`}>
					{title && (
						<ViewX>
								<Text style={tw`flex-wrap flex-1 text-sm text-white font-bold`}>{title}</Text>
						</ViewX>
					)}
					{description && (
						<ViewX>
							<Text style={tw`flex-wrap flex-1 text-sm text-white`}>{description}</Text>
						</ViewX>
					)}
					{info && (
						<ViewX>
							<Text style={tw`flex-wrap flex-1 text-xs text-white`}>{info}</Text>
						</ViewX>
					)}
				</ViewY>
				{children}
			</ViewY>
			{!!RightComponent && <RightComponent />}
		</ViewX>
	);
};

export default CardTitle;
