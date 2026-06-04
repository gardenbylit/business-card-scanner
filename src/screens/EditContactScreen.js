import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';

const EditContactScreen = ({ route, navigation }) => {
  const { contact } = route.params;
  const [formData, setFormData] = useState(contact || {});

  const handleSave = () => {
    Alert.alert('Success', 'Contact updated!', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Contact</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        <FormField
          label="First Name"
          placeholder="John"
          value={formData.firstName}
          onChangeText={(value) => updateField('firstName', value)}
        />
        <FormField
          label="Last Name"
          placeholder="Doe"
          value={formData.lastName}
          onChangeText={(value) => updateField('lastName', value)}
        />
        <FormField
          label="Title"
          placeholder="CEO"
          value={formData.title}
          onChangeText={(value) => updateField('title', value)}
        />
        <FormField
          label="Company"
          placeholder="Your Company"
          value={formData.company}
          onChangeText={(value) => updateField('company', value)}
        />
        <FormField
          label="Email"
          placeholder="john@example.com"
          value={formData.email}
          onChangeText={(value) => updateField('email', value)}
          keyboardType="email-address"
        />
        <FormField
          label="Phone"
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChangeText={(value) => updateField('phone', value)}
          keyboardType="phone-pad"
        />
        <FormField
          label="Fax"
          placeholder="+1 (555) 123-4567"
          value={formData.fax}
          onChangeText={(value) => updateField('fax', value)}
        />
        <FormField
          label="Address"
          placeholder="123 Main St"
          value={formData.address}
          onChangeText={(value) => updateField('address', value)}
        />
        <FormField
          label="Website"
          placeholder="https://example.com"
          value={formData.website}
          onChangeText={(value) => updateField('website', value)}
          keyboardType="url"
        />
        <FormField
          label="Notes"
          placeholder="Add notes..."
          value={formData.notes}
          onChangeText={(value) => updateField('notes', value)}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Ionicons name="checkmark" size={24} color="white" />
          <Text style={styles.saveButtonText}>Update Contact</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const FormField = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
}) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        placeholder={placeholder}
        placeholderTextColor={colors.lightGray}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  scrollView: {
    flex: 1,
    padding: spacing.large,
  },
  fieldContainer: {
    marginBottom: spacing.large,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.small,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: spacing.medium,
  },
  input: {
    paddingVertical: spacing.medium,
    fontSize: 16,
    color: colors.text,
  },
  multilineInput: {
    paddingVertical: spacing.medium,
    textAlignVertical: 'top',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.medium,
    borderRadius: 8,
    marginVertical: spacing.large,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: spacing.small,
  },
});

export default EditContactScreen;
