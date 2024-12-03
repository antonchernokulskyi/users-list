import React from 'react';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import { Appbar, Button, TextInput, useTheme } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { UserDetailsProp } from 'navigation';
import { RouteService } from 'services';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUsersStoreSelectors } from 'stores';
import { Box } from 'themes';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView } from 'ui';
import { UserDetailsSchema, UserDetailsSchemaType } from './types';

export const UserDetails: React.FC = () => {
  const { styles } = useStyles(stylesheet);
  const { colors } = useTheme();

  const { t } = useTranslation();

  const users = useUsersStoreSelectors.use.users();

  const addUser = useUsersStoreSelectors.use.addUser();
  const editUser = useUsersStoreSelectors.use.editUser();

  const { params } = useRoute<UserDetailsProp>();

  const userId = params?.userId;

  const user = userId ? users.find(user => user.id === userId) : null;

  const { control, handleSubmit } = useForm<UserDetailsSchemaType>({
    values: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    },
    resolver: zodResolver(UserDetailsSchema),
  });

  const onSubmit: SubmitHandler<UserDetailsSchemaType> = userDetails => {
    if (user) {
      editUser({ ...userDetails, id: user.id });
    } else {
      addUser({ ...userDetails });
    }

    RouteService.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: colors.background }}>
      <Appbar.Header>
        <Appbar.BackAction size={22} onPress={RouteService.goBack} />
        <Appbar.Content
          title={
            user ? t('user-details.edit-user') : t('user-details.add-user')
          }
        />
      </Appbar.Header>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Box flex={1} paddingHorizontal={16}>
          <Box flexDirection="row" marginBottom={8}>
            <Box flex={1} marginRight={6}>
              <Controller
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <TextInput
                    mode="outlined"
                    label={t('user-details.first-name')}
                    placeholder="John"
                    value={value}
                    onChangeText={onChange}
                    error={!!error}
                  />
                )}
                name="firstName"
              />
            </Box>

            <Box flex={1} marginLeft={6}>
              <Controller
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <TextInput
                    mode="outlined"
                    label={t('user-details.last-name')}
                    placeholder="Doe"
                    value={value}
                    onChangeText={onChange}
                    error={!!error}
                  />
                )}
                name="lastName"
              />
            </Box>
          </Box>

          <Controller
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <TextInput
                mode="outlined"
                label={t('user-details.email')}
                placeholder="johndoe@gmail.com"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                error={!!error}
              />
            )}
            name="email"
          />

          <Box marginTop={24}>
            <Button
              mode="contained-tonal"
              onPress={handleSubmit(onSubmit)}
              style={styles.button}
              labelStyle={styles.label}>
              {t('user-details.save')}
            </Button>
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const stylesheet = createStyleSheet(theme => ({
  button: {
    marginLeft: 'auto',
    width: '50%',
    height: 48,
  },
  label: {
    fontFamily: theme.fonts.Medium,
    fontSize: 16,
    paddingTop: 4,
  },
}));
