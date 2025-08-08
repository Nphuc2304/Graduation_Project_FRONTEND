import React, { memo } from 'react';
import { View } from 'react-native';
import CategoryList from '@home/components/CategoryList';
import colors from '@/Color';
import { BookmarkStyles } from '@styles';

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const CategoryFilter = memo<CategoryFilterProps>(({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <View style={BookmarkStyles.categorySection}>
      <CategoryList
        data={categories}
        onChangeIndex={onCategoryChange}
        color={colors.white}
        colorActive={colors.primary}
        padV={10}
        width={100}
      />
    </View>
  );
});