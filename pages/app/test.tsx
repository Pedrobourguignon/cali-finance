import { Flex, Text } from '@chakra-ui/react';
import { LifeIsEasierBanner } from 'components';
import { AppLayout } from 'layouts';
import React, { useRef } from 'react';
import Slider from 'react-slick';

const Test = () => {
	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
	};
	const ref = useRef<HTMLDivElement>(null);
	const [slider, setSlider] = React.useState<Slider | null>(null);

	return (
		<Flex>
			<AppLayout right={<LifeIsEasierBanner />}>
				<Flex pt="6" color="black" direction="column">
					<Text>Your Organizations</Text>
					<Flex w="full">
						<Slider
							{...settings}
							ref={sliderRef => setSlider(sliderRef)}
							arrows={false}
							className="slider"
						>
							<Flex>
								<Text>1</Text>
							</Flex>
							<Flex>
								<Text>2</Text>
							</Flex>
							<Flex>
								<Text>3</Text>
							</Flex>
							<Flex>
								<Text>4</Text>
							</Flex>
						</Slider>
					</Flex>
				</Flex>
			</AppLayout>
		</Flex>
	);
};

export default Test;
