/*
 * Copyright (c) 2020, Mikael Lazarev
 */
import React from 'react';
import MarkdownRender, {RenderRules} from 'react-native-markdown-display';
import {Button, Text} from 'react-native-elements';
import {Dimensions, StyleSheet, View} from 'react-native';
import {ScaledImage} from './ScaledImage';
import {useNavigation} from '@react-navigation/native';

export interface MarkdownProps {
  text: string;
  imageUrl?: string | undefined;
}

export function Markdown({text, imageUrl}: MarkdownProps) {
  const navigation = useNavigation();
  const rules: RenderRules = {
    heading1: (node, children) => (
      <View style={styles.headerContainer}>
        <Text h1>{children}</Text>
      </View>
    ),
    heading2: (node, children) => (
      <View style={styles.header2Container}>
        <Text h2>{children}</Text>
      </View>
    ),

    heading3: (node, children) => (
      <View style={styles.header2Container}>
        <Text h3>{children}</Text>
      </View>
    ),
    body: (node, children) => <View style={styles.body}>{children}</View>,
    // paragraph: (node, children) => (
    //   <View style={styles.sectionContainer}>
    //     <Text style={styles.sectionDescription}>{children}</Text>
    //   </View>
    // ),
    image: (node, children) => {
      if (imageUrl === undefined || imageUrl === '') {
        return <View />;
      }
      return (
        <View style={styles.imageContainer}>
          <ScaledImage source={{uri: imageUrl}} />
        </View>
      );
    },

    link: (node, children, parentNodes, onLinkPressed) => {
      console.log('NODE:', node.attributes.href);
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            width: Dimensions.get('window').width - 48,
          }}>
          <Button
            title={node.children[0].content}
            onPress={() =>
              navigation.navigate(node.attributes.href.replace('_', ' '))
            }
            buttonStyle={{
              width: Dimensions.get('window').width - 88,
            }}
          />
        </View>
      );
    },
  };

  const mdStyles = StyleSheet.create({
    paragraph: {
      marginTop: 12,
      paddingHorizontal: 24,
      fontSize: 18,
      fontWeight: '400',
    },
    bullet_list_icon: {
      marginLeft: 24,
    },
    bullet_list_content: {
      flex: 1,
      flexWrap: 'wrap',
      marginLeft: -20,
      marginBottom: 0,
    },
    link: {
      backgroundColor: 'red',
    },
  });

  return (
    <MarkdownRender rules={rules} style={mdStyles}>
      {text}
    </MarkdownRender>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#FFF',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    marginTop: 12,
    marginLeft: -24,
    paddingHorizontal: 0,
  },
  headerContainer: {
    marginTop: 12,
    paddingHorizontal: 10,
  },

  header2Container: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  sectionContainer: {
    marginTop: 12,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },

  buttonContainer: {
    // paddingTop: 20,
    // flex: 1,
    // display: 'flex',

    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // paddingLeft: 20,
    // paddingRight: 20,
    // marginBottom: 30,
    // margin: 'auto',
    textAlign: 'center',
  },

  twoColumns: {
    fontSize: 24,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
});
