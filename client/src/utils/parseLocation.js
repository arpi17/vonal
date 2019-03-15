// @desc:    Parses the city and country from the reverse geocoding response
// @args:    features: Array - containing the feature data to be parsed
// @return:  [country, city]: Array - containing the country and city string

const parseLocation = features => {
  if (features.length === 0) {
    throw new Error('The argument array is empty');
  }

  let i = features.length - 1;
  let country, city;

  while (i >= 0 && !(country && city)) {
    // Parse country
    if (!country && features[i].place_type.includes('country')) {
      country = features[i].place_name.split(',')[0].trim();
    }
    // Parse city
    if (!city && features[i].place_type.includes('place')) {
      city = features[i].place_name.split(',')[0].trim();
    }
    i--;
  }
  return [country, city];
};

export default parseLocation;
