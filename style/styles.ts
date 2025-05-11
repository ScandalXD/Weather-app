import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  dropdown: {
    position: 'absolute',
    top: 45,
    width: '100%',
    maxHeight: 150,
    borderRadius: 8,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 1000,
  },
  historyItem: {
    fontSize: 16,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  info: {
    marginTop: 30,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },

  detailsContainer: {
    padding: 20,
    alignItems: 'center',
    minHeight: '100%',
  },
  city: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temp: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 20,
    textTransform: 'capitalize',
    marginTop: 10,
    marginBottom: 20,
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 30,
    marginBottom: 10,
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
  },

  card: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 10,
    width: 100,
    elevation: 3,
  },
  time: {
    fontSize: 14,
    color: '#333',
  },
  iconSmall: {
    width: 50,
    height: 50,
  },
  tempSmall: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 12,
    textAlign: 'center',
  },

  dayRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 8,
  borderBottomColor: '#ccc',
  borderBottomWidth: 1,
},
  
});
