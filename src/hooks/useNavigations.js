
import {useNavigation} from '@react-navigation/native';

const useNavigations = () => {
  const navigation = useNavigation();
  const MOVIE_DETAIL_PAGE_NAVIGATION = route => {
    navigation.navigate('MovieDetail', {route: route});
  };

  return {
    MOVIE_DETAIL_PAGE_NAVIGATION,
  };
};

export default useNavigations;
