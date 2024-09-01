import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');

  // Get current date
  const currentDate = new Date().toISOString().split('T')[0];

  // Example upcoming deadlines (please replace this with actual data from the backend)
  const upcomingDeadlines: Record<string, { marked: boolean; dotColor: string }> = {
    '2024-09-02': { marked: true, dotColor: 'red' },
    '2024-09-30': { marked: true, dotColor: 'red' },
    '2024-08-20': { marked: true, dotColor: 'red' },
    '2024-08-23': { marked: true, dotColor: 'red' },
    '2024-08-27': { marked: true, dotColor: 'red' },
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Scholarship Calendar</Text>
      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#4a90e2',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#02B200',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#ff5722',
          selectedDotColor: '#ffffff',
          arrowColor: '#4a90e2',
          monthTextColor: '#2d4150',
          indicatorColor: '#4a90e2',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14
        }}
        onDayPress={(day: DateData) => {
          setSelectedDate(day.dateString);
          console.log('selected day', day);
        }}
        markedDates={{
          ...upcomingDeadlines,
          [currentDate]: { selected: true, selectedColor: '#02B200' },
          [selectedDate]: { selected: true, selectedColor: '#4a90e2' }
        }}
      />
      {selectedDate && (
        <View style={styles.eventContainer}>
          <Text style={styles.eventText}>Selected Date: {selectedDate}</Text>
          {upcomingDeadlines[selectedDate] ? (
            <Text style={styles.yesEventText}>Deadline approaching.</Text>
          ) : (
            <Text style={styles.noEventText}>No current deadline available.</Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d4150',
    marginBottom: 20,
    textAlign: 'center',
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventContainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventText: {
    fontSize: 18,
    fontWeight: 'semibold',
    color: '#2d4150',
  },
  yesEventText: {
    fontSize: 16,
    padding: 12,
    color: '#ff0000',
  },
  noEventText: {
    fontSize: 16,
    padding: 12,
    color: '#2d4150',
  },
});

export default CalendarScreen;
