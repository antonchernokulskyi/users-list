import React, { useState } from 'react';
import {
  Avatar,
  Surface,
  useTheme,
  Menu,
  IconButton,
  Divider,
  Portal,
  Dialog,
  Button,
} from 'react-native-paper';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { RouteService } from 'services';
import { User, useUsersStoreSelectors } from 'stores';
import { Box, Text } from 'themes';
import { useTranslation } from 'react-i18next';
import { getInitials } from './helpers';

export const UserCard = (user: User) => {
  const { id, firstName, lastName, email } = user;

  const { styles } = useStyles(stylesheet);

  const { t } = useTranslation();

  const [isMenuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const [isDeleteAlertVisible, setDeleteAlertVisible] = useState(false);

  const showDeleteAlert = () => {
    closeMenu();
    setDeleteAlertVisible(true);
  };

  const hideDeleteAlert = () => setDeleteAlertVisible(false);

  const { colors } = useTheme();

  const deleteUser = useUsersStoreSelectors.use.deleteUser();

  const onEditUserPress = () => {
    closeMenu();
    RouteService.navigate('USER_DETAILS', { userId: id });
  };

  const onDeleteUserPress = () => deleteUser(id);

  return (
    <Surface mode="flat">
      <Box style={styles.card}>
        <Box flexDirection="row" alignItems="center">
          <Avatar.Text label={getInitials(user)} size={48} />

          <Box paddingLeft={16}>
            <Text fontFamily="Medium" fontSize={16} marginBottom={2}>
              {firstName} {lastName}
            </Text>

            <Text>{email}</Text>
          </Box>
        </Box>

        <Menu
          visible={isMenuVisible}
          anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
          onDismiss={closeMenu}
          contentStyle={{
            borderRadius: 16,
            backgroundColor: colors.background,
          }}>
          <Menu.Item
            leadingIcon="account-edit"
            title={t('users.edit')}
            onPress={onEditUserPress}
          />

          <Menu.Item
            leadingIcon="account-remove"
            title={t('users.delete')}
            onPress={showDeleteAlert}
          />
        </Menu>

        <Portal>
          <Dialog visible={isDeleteAlertVisible} onDismiss={hideDeleteAlert}>
            <Dialog.Title>{t('users.delete-alert-title')}</Dialog.Title>
            <Dialog.Content>
              <Text>{t('users.delete-alert-content')}</Text>
            </Dialog.Content>

            <Dialog.Actions>
              <Button onPress={hideDeleteAlert}>{t('users.cancel')}</Button>
              <Button onPress={onDeleteUserPress}>{t('users.delete')}</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Box>

      <Divider />
    </Surface>
  );
};

const stylesheet = createStyleSheet(() => ({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingVertical: 8,
  },
}));
