import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { HomeHeader } from '../../components/home/HomeHeader';
import { LocationBar } from '../../components/home/LocationBar';
import { BannerCarousel } from '../../components/home/BannerCarousel';
import { CategorySection } from '../../components/home/CategorySection';
import { PreviousOrderCard } from '../../components/home/PreviousOrderCard';
import { SectionHeader } from '../../components/SectionHeader';
import { DealProductCard, DealProduct } from '../../components/DealProductCard';
import { AppHeader } from '../../components/AppHeader';

const POPULAR_DEALS: DealProduct[] = [
  {
    id: '1',
    name: 'Moder Chair',
    price: 3599,
    rating: 4.8,
    image: require('../../assets/chair.png'),
    wishlisted: true,
  },
  {
    id: '2',
    name: 'LG Washing Machine',
    price: 45999,
    rating: 4.8,
    discount: '5%',
    image: require('../../assets/washing-machine.png'),
    wishlisted: true,
  },
  {
    id: '3',
    name: 'Moder Chair',
    price: 3599,
    rating: 4.8,
    image: require('../../assets/chair.png'),
  },
  {
    id: '4',
    name: 'LG Washing Machine',
    price: 45999,
    rating: 4.8,
    discount: '10%',
    image: require('../../assets/washing-machine.png'),
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      {/* Fixed Header */}
      <HomeHeader />

      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#ffffff' }}>

      {/* Location */}
      <LocationBar city="Bengaluru" address="BTM Layout, 500628" />

      {/* Search */}
      <AppHeader
        placeholder="Search Anything..."
        withBackground={false}
        onFocus={() => router.push('/(tabs)/search')}
      />

      {/* Banner */}
      <View style={styles.section}>
        <BannerCarousel />
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <SectionHeader title="Categories" onSeeAll={() => {}} />
        <CategorySection />
      </View>

      {/* Previous Order */}
      <View style={styles.section}>
        <SectionHeader title="Previous Order" />
        <PreviousOrderCard />
      </View>

      {/* Popular Deals */}
      <View style={styles.section}>
        <SectionHeader title="Popular Deals" onSeeAll={() => {}} />
        <View style={styles.grid}>
          {POPULAR_DEALS.map((product) => (
            <DealProductCard key={product.id} product={product} />
          ))}
        </View>
      </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  section: {
    marginTop: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
});
