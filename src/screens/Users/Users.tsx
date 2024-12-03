import { FlashList } from '@shopify/flash-list';
import React, { useMemo, useState } from 'react';
import { NativeScrollEvent, View, NativeSyntheticEvent } from 'react-native';
import { Searchbar, Appbar, AnimatedFAB, useTheme } from 'react-native-paper';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { RouteService } from 'services';
import { useUsersStore } from 'stores';
import { Box, Text } from 'themes';
import { useTranslation } from 'react-i18next';
import { UserCard } from './ui';
import { getSearchedUsers } from './helpers';

export const Users: React.FC = () => {
  const { styles } = useStyles(stylesheet);
  const { colors } = useTheme();

  const { t } = useTranslation();

  const { users } = useUsersStore();

  const [isExtended, setIsExtended] = useState(true);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(event.nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const [search, setSearch] = useState('');

  const searchedUsers = useMemo(
    () => getSearchedUsers(users, search),
    [users, search],
  );

  return (
    <Box style={styles.container(colors.background)}>
      <Appbar.Header>
        <Appbar.Content title={t('users.users')} />
      </Appbar.Header>

      {!!users.length && (
        <Box paddingHorizontal={16} paddingBottom={16}>
          <Searchbar
            placeholder={t('users.search')}
            onChangeText={setSearch}
            value={search}
          />
        </Box>
      )}

      {users.length ? (
        <FlashList
          data={searchedUsers}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => <UserCard {...item} />}
          estimatedItemSize={73}
          contentContainerStyle={{ paddingBottom: 100 }}
          onScroll={onScroll}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 100,
          }}>
          <Text style={{ fontSize: 16, textAlign: 'center' }}>
            {t('users.no-users')}
          </Text>
        </View>
      )}

      <AnimatedFAB
        icon="account-plus"
        label={t('users.add-user')}
        extended={isExtended}
        onPress={() => RouteService.navigate('USER_DETAILS')}
        style={styles.addUserButton(colors.primaryContainer)}
      />
    </Box>
  );
};

const stylesheet = createStyleSheet((_, runtime) => ({
  container: (backgroundColor: string) => ({
    flex: 1,
    backgroundColor,
  }),
  addUserButton: (backgroundColor: string) => ({
    position: 'absolute',
    right: 16,
    bottom: (runtime.insets.bottom || 16) + 16,
    backgroundColor,
  }),
}));
