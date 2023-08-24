import {ActivityIndicator, View} from 'react-native';
import React, {useRef, useState} from 'react';
import WebView from 'react-native-webview';

export const CustomWebView = ({route}: {route: any}) => {
  const {id, header, url, link, hideElements} = route?.params ?? {};
  const webviewRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  // const hideSectionById = (id: string) => {
  //   const script = `
  //     const element = document.getElementsByClassName('${id}');
  //     if (element) {
  //       element.style.display = 'none';
  //     }
  //   `;

  //   webviewRef?.current?.injectJavaScript(script);
  // };

  return (
    <View style={!link ? {backgroundColor: 'red'} : {backgroundColor: 'black'}}>
      {/* <CustomAppBar title={header} /> */}
      <View style={{flex: 1}}>
        <WebView
          onLoad={() => {
            setIsLoading(false);
            // hideSectionById('text-dedicatedDpcPrimary');
          }}
          style={{flex: 1, backgroundColor: 'white'}}
          source={{
            uri: `${link}`,
          }}
          // injectedJavaScript={hideElements}
        />
        {isLoading && (
          <ActivityIndicator />
          //   <CustomActivityIndicator
          //     size="large"
          //     color={COLORS.primaryBlue}
          //     style={customWebViewStyles.loader}
          //   />
        )}
      </View>
    </View>
  );
};
