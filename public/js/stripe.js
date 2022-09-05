/*eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51LdxSISGjCDtk4HvjMp1xl35FHGE1V8KgtrPxMce3N8Hg4904MacqmFxgkdhuvR4563KudWRZTlpwm0UoEVxbwc5002V7qIWWd'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
      // `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    // console.log(session);
  
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
