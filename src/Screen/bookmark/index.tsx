import {Image, Modal, Text, View} from 'react-native';
import Header from '../../../components/Header';
import {useState} from 'react';
import HomeStyles from '../../bottomTabStyles/HomeStyles';
import CategoryList from '../../(tabs)/Home/components/CategoryList';
import colors from '../../Color';
import CampaignList from '../../(tabs)/Home/components/CampaignList';
import BookmarkStyles from '../../Styles/BookmarkStyles';
import ButtonIcon from '../../../components/ButtonIcon';
import ListProdStyles from '../../Styles/ListProdStyles';
import AppStyles from '../../Styles/AppStyles';
import ButtonActive from '../../../components/ButtonActive';

export const Bookmark = ({navigation}: any) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  const categories = [
    {id: '1', name: 'Medical Aid'},
    {id: '2', name: 'Disaster Relief'},
    {id: '3', name: 'Education Fund'},
    {id: '4', name: 'Animal Welfare'},
    {id: '5', name: 'Community Projects'},
    {id: '6', name: 'Environmental Causes'},
    {id: '7', name: 'Startup Funding'},
    {id: '8', name: 'Sports & Fitness'},
    {id: '9', name: 'Arts & Culture'},
    {id: '10', name: 'Emergency Assistance'},
  ];

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    console.log('Selected Category:', categoryId);
  };

  // campaign
  const [data, setData] = useState([
    {
      id: '1',
      name: 'Campaign 1',
      image:
        'https://i.pinimg.com/736x/8c/56/c4/8c56c483afc07fbbc8d1c937c53c26b1.jpg',
      priceCurrent: 500,
      pricegoal: 1000,
      donators: 10,
      dayLeft: '5',
    },
    {
      id: '2',
      name: 'Campaign 2',
      image:
        'https://i.pinimg.com/736x/69/06/61/690661e5f4fdf73f358ce77340d3d045.jpg',
      priceCurrent: 700,
      pricegoal: 2000,
      donators: 20,
      dayLeft: '10',
    },
    {
      id: '2',
      name: 'Campaign 3',
      image:
        'https://i.pinimg.com/736x/9c/a3/32/9ca332469e80c3416ec91ed8afe2f402.jpg',
      priceCurrent: 2300,
      pricegoal: 3000,
      donators: 15,
      dayLeft: '20',
    },
  ]);

  const handleSelectItem = (id: string) => {
    console.log('Selected Item:', id);
  };

  const handleLongPress = (campaign: any) => {
    setSelectedCampaign(campaign);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedCampaign(null);
  };

  const percent = selectedCampaign
    ? parseFloat(
        Math.min(
          100,
          Math.max(
            0,
            (selectedCampaign.priceCurrent / selectedCampaign.pricegoal) * 100,
          ),
        ).toFixed(0),
      )
    : 0;

  return (
    <View style={HomeStyles.container}>
      <Header
        iconBack={require('../../../assets/icons/back.png')}
        title="Bookmark"
        icon={require('../../../assets/icons/vertical_dots.png')}
        mg={20}
        navigation={navigation}
      />
      <View style={HomeStyles.pd}>
        <CategoryList
          data={categories}
          onChangeIndex={handleCategoryChange}
          color={colors.white}
          colorActive={colors.primary}
          padV={10}
          width={100}
        />
      </View>
      <CampaignList
        data={data}
        onSelectItem={handleSelectItem}
        onLongPress={handleLongPress}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}>
        <View style={BookmarkStyles.modalBackground}>
          <View style={BookmarkStyles.containerModel}>
            {selectedCampaign && (
              <>
                <ButtonIcon
                  icon={require('../../../assets/icons/close.png')}
                  bgColor={colors.white}
                  iconColor={colors.black}
                  borderRa="50%"
                  styles={{position: 'absolute', top: 25, right: 30, zIndex: 1}}
                  func={() => {
                    handleCloseModal();
                  }}
                />
                <View style={BookmarkStyles.imgContainer}>
                  <Image
                    source={{uri: selectedCampaign.image}}
                    style={BookmarkStyles.img}
                  />
                </View>
                <View style={ListProdStyles.content}>
                  <Text
                    style={ListProdStyles.title}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {selectedCampaign.name}
                  </Text>
                  <View style={ListProdStyles.textWrap}>
                    <Text
                      style={[
                        ListProdStyles.textContent,
                        {color: colors.primary},
                      ]}>
                      {selectedCampaign.priceCurrent}k MMK{' '}
                    </Text>
                    <Text style={ListProdStyles.textContent}>
                      fund raised from{' '}
                    </Text>
                    <Text
                      style={[
                        ListProdStyles.textContent,
                        {color: colors.primary},
                      ]}>
                      {selectedCampaign.pricegoal}M MMK
                    </Text>
                  </View>
                  <View style={AppStyles.rowContainerSpace}>
                    <View
                      style={{
                        width: '90%',
                        backgroundColor: colors.lightPrimary,
                        height: 3,
                        overflow: 'hidden',
                        position: 'relative',
                        borderRadius: 10,
                        marginVertical: 20,
                      }}>
                      <View
                        style={{
                          width: `${percent}%` as `${number}%`,
                          height: percent > 0 ? 3 : 0,
                          backgroundColor: colors.primary,
                          borderRadius: 10,
                        }}></View>
                    </View>
                    <Text style={ListProdStyles.textPer}>{percent}%</Text>
                  </View>
                  <View style={AppStyles.rowContainerSpace}>
                    <Text style={ListProdStyles.textContent}>
                      <Text style={{color: colors.primary}}>
                        {selectedCampaign.donators}
                      </Text>{' '}
                      Donators
                    </Text>
                    <Text style={ListProdStyles.textContent}>
                      <Text style={{color: colors.primary}}>
                        {selectedCampaign.dayLeft}
                      </Text>{' '}
                      days left
                    </Text>
                  </View>
                </View>
                <Text style={BookmarkStyles.text}>
                  Remove from your bookmark?
                </Text>
                <View style={[AppStyles.rowContainerSpace, {marginBottom: 10}]}>
                  <ButtonActive
                    text="Cancel"
                    color={colors.primary}
                    bgColor={colors.white}
                    width="45%"
                    radius={50}
                    borderColor={colors.primary}
                    func={() => {
                      handleCloseModal();
                    }}
                  />
                  <ButtonActive
                    text="Remove"
                    color={colors.white}
                    bgColor={colors.primary}
                    width="45%"
                    radius={50}
                    borderColor={colors.primary}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};
