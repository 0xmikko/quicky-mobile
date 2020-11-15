/*
 * Copyright (c) 2020, Mikael Lazarev
 */
import React, {useEffect, useState} from 'react';
import {Dimensions, Image} from 'react-native';

export interface ScaledImageProps {
  source: {uri: string};
  width?: number;
  height?: number;
}

export function ScaledImage({
  source: {uri},
  width,
  height,
}: ScaledImageProps): React.ReactElement {
  const [scaledWidth, setWidth] = useState(width || 0);
  const [scaledHeight, setHeight] = useState(height || 0);

  useEffect(() => {
    Image.getSize(uri, (imgWidth, imgHeight) => {
      if (width === undefined && height !== undefined) {
        setWidth(imgWidth * (height / imgHeight));
      } else if (width !== undefined && height === undefined) {
        setHeight(imgHeight * (width / imgWidth));
      } else if (width === undefined && height === undefined) {
        const windowWidth = Dimensions.get('window').width;
        setWidth(windowWidth);
        setHeight(imgHeight * (windowWidth / imgWidth));
      }
    });
  }, [width, height, uri]);

  return (
    <Image source={{uri}} style={{width: scaledWidth, height: scaledHeight}} />
  );
}
