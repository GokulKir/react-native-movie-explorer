import {StyleSheet, Platform, Dimensions, StatusBar} from 'react-native';

const {width} = Dimensions.get('window');
const STATUS_BAR_HEIGHT =
  Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 44;

export default StyleSheet.create({
  width, // Expose width for use in MovieListSkeletonLoader
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  retryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  detailsContainer: {
    padding: 24,
    marginHorizontal: 16,
    marginBottom: 80,
    borderRadius: 16,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 16,
    textAlign: 'left',
    letterSpacing: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.9,
  },
  description: {
    fontSize: 15,
    marginBottom: 24,
    lineHeight: 24,
    fontWeight: '400',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  watchButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  trailerButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  trailerButtonText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  // Skeleton Loader Styles for MovieDetailScreen
  skeletonImage: {
    flex: 1,
    borderRadius: 16,
    margin: 16,
  },
  skeletonDetails: {
    padding: 24,
    marginHorizontal: 16,
    marginBottom: 80,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '90%',
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.4,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  skeletonTitle: {
    height: 32,
    width: '85%',
    borderRadius: 8,
    marginBottom: 16,
  },
  skeletonInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  skeletonInfo: {
    height: 20,
    width: '45%',
    borderRadius: 6,
  },
  skeletonDescription: {
    height: 20,
    width: '100%',
    borderRadius: 6,
    marginBottom: 12,
  },
  skeletonButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  skeletonButton: {
    height: 48,
    flex: 1,
    borderRadius: 30,
  },
  // MovieListScreen Styles
  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 24,
  },
  header: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    top: STATUS_BAR_HEIGHT + 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
  },
  filterButton: {
    marginLeft: 8,
    padding: 10,
    borderRadius: 20,
  },
  searchOptions: {
    position: 'absolute',
    top: STATUS_BAR_HEIGHT + 60,
    left: 16,
    right: 16,
    borderRadius: 12,
    padding: 16,
    zIndex: 5,
    marginTop: 20,
  },
  searchOptionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  sortButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginLeft:5
  },
  sortButtonSelected: {
    backgroundColor: '#FF5733',
    borderColor: '#FF5733',
  },
  sortText: {
    fontSize: 13,
    fontWeight: '500',
  },
  sortTextSelected: {
    fontWeight: '600',
    color: '#fff',
  },
  categoryContainer: {
    paddingVertical: 2,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    marginLeft:5
  },
  categoryButtonSelected: {
    backgroundColor: '#FF5733',
    borderColor: '#FF5733',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  categoryTextSelected: {
    fontWeight: '600',
    color: '#fff',
  },
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '500',
  },
  movieList: {
    paddingVertical: 4,
  },
  noResultsText: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 16,
  },
});
