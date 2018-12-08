import React from 'react';
import T from 'prop-types';
import { Text, View } from 'react-native';
import { Subtitle, Select, ScreenWrapper, Icon, Button } from '../../components';

import currencies from '../../constants/currencies';

import s from './styles';
import { dimensions, colors } from '../../styles';


const Settings = ({
  currency,
  onChangeCurrency,
  onGenerateData,
  onResetData,
}) => (
  <ScreenWrapper style={s.container}>
    <View>
      <Subtitle leftText="Choose a currency" />
      <Select
        isShowScroll={false}
        options={[currencies.dollar, currencies.euro, currencies.rupees]}
        containerStyle={s.selectorContainer}
        style={s.selector}
        defaultValue={currency}
        selectorsWidth={dimensions.containerWidth}
        onSelect={onChangeCurrency}
        textStyle={s.selectTextStyle}
        optionHeight={dimensions.verticalIndent * 2.8}
      />
      <View style={s.generateButtonContainer}>
        <Button
          onPress={onGenerateData}
          title="Generate data"
          titleStyle={s.buttonTitle}
          containerStyle={s.buttonContainer}
        />
        <Button
          onPress={onResetData}
          title="Reset data"
          titleStyle={s.buttonTitle}
          containerStyle={s.buttonContainer}
          backgroundColor={colors.red}
        />
      </View>
    </View>

  </ScreenWrapper>
);

Settings.propTypes = {
  currency: T.object,
  onChangeCurrency: T.func,
  onGenerateData: T.func,
  onResetData: T.func,
};


export default Settings;
