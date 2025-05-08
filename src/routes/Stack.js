import {createStackNavigator} from '@react-navigation/stack';
import MovieListScreen from '../screens/MovieListScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Movie"
        component={MovieListScreen}
      />
      <Stack.Screen
        options={{headerShown: false, animation: 'scale_from_center'}}
        name="MovieDetail"
        component={MovieDetailScreen}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
