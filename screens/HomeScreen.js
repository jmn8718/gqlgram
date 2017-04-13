import React from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import faker from 'faker';
import Post from '../components/Post';

const generateData = () => {
  const data = [];
  for (let i of [1,2,3,4,5,6,7,8]) {
    data.push(
      {
        id: faker.random.uuid(),
        username: faker.name.firstName(),
        image: faker.image.image(),
        avatar: faker.image.avatar(),
        imageUrl: faker.image.imageUrl(),
        dataUri: faker.image.dataUri(),
        timestamp: faker.date.recent().toString(),
        post: faker.lorem.paragraph(),
        liked: faker.random.boolean(),
      }
    )
  }
  return data;
}

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    });
    const data = generateData();
    this.state = {
      dataSource: ds.cloneWithRows(data),
      data,
    };
  }

  _loadMoreContentAsync = async () => {
    const data = this.state.data.concat(generateData());
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
      data,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          ref={(list) => this.list = list}
          renderScrollComponent={props => <InfiniteScrollView {...props} />}
          dataSource={this.state.dataSource}
          renderRow={(item) => <Post data={item} />}
          canLoadMore
          onLoadMoreAsync={this._loadMoreContentAsync}
          enableEmptySections
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
  },
});
