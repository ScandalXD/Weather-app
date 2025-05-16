import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    backgroundColor: '#f5f7fa',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    backgroundColor: '#fff',
    width: '100%',
  },

  button: {
    backgroundColor: '#007aff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 15,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#007aff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },


  dropdown: {
    position: 'absolute',
    top: 60,
    width: '100%',
    maxHeight: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    zIndex: 1000,
  },
  historyItem: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    color: '#444',
  },
  info: {
    marginTop: 40,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
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
