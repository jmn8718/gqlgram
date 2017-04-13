import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import Layout from '../../constants/Layout';
import { getTimeInWords } from '../../utilities/date';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
const imageStyle = { width: Layout.window.width, height: Layout.window.width };

export default function({ data }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: data.avatar }} style={styles.cardAvatar} resizeMethod="auto" />
        <Text style={styles.textUsername}>{data.username}</Text>
      </View>
      <Image source={{ uri: data.image }} style={imageStyle} resizeMethod="auto" />
      <View style={styles.cardFooter}>
        <View style={styles.cardFooterActions}>
          <View style={styles.cardFooterActionsMain}>
            <FontAwesome
              name={data.liked ? 'heart' : 'heart-o'}
              size={24}
              color={data.liked ? Colors.iconLiked : Colors.iconDefault}
            />
            <FontAwesome
              name="comment-o"
              size={24}
              color={Colors.iconDefault}
              style={{ paddingLeft: 16 }}
            />
            <FontAwesome
              name="send-o"
              size={24}
              color={Colors.iconDefault}
              style={{ paddingLeft: 16 }}
            />
          </View>
          <FontAwesome
            name="bookmark-o"
            size={24}
            color={Colors.iconDefault}
          />
        </View>
        <View style={styles.cardFooterInformation}>
          <Text><Text style={styles.textUsername}>{data.username}</Text> {data.post}</Text>
          <Text style={styles.cardFooterTimeStamp}>{getTimeInWords(data.timestamp)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fafafa',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginLeft: 8,
    marginRight: 8,
  },
  cardAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  cardFooter: {
    padding: 8,
    paddingRight: 16,
    paddingLeft: 16,
  },
  cardFooterTimeStamp: {
    color: '#acacac',
    fontSize: 12,
    marginTop: 8,
  },
  cardFooterActions: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#acacac',
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardFooterActionsMain: {
    flexDirection: 'row',
  },
  cardFooterInformation: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  textUsername: {
    fontWeight: 'bold',
  }
})
