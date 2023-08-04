import { useRef, useEffect } from 'react';
import { Carousel, Container, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// Components
import CarouselButton from 'components/common/CarouselButton';

// Reducers
import { retrieveAllNews } from 'components/redux/reducer/NewsReducer';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

// Styling
import 'assets/css/guest/home_pape/Banner.css';

const AdBanner = () => {
  const allNews = useSelector(state => state.newsReducer.allNews);
  const dispatch = useDispatch(); const navigate = useNavigate();

  const ref = useRef(null);
  const onPrevClick = () => { ref.current.prev(); };
  const onNextClick = () => { ref.current.next(); };

  // Responsive handling
  let size = useResizer();

  useEffect(() => { 
    var data = {
      limit: 3,
      offset: 0
    };

    dispatch(retrieveAllNews(data, navigate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='ad-banner-body'>
      <Container className='ad-banner mx-6'>
        <div style={{ position: 'relative' }}>
          {size > 1 &&
            <CarouselButton isLeft={true} onClick={onPrevClick} />
          }
          <Row>
            <Carousel ref={ref} variant='light' controls={false}>
              {Object.keys(allNews).length > 0 && allNews.news.map((newsItem, idx) => (
                <Carousel.Item key={idx} interval={40000}>
                  <div className='ad-banner-image-container' onClick={() => { window.open(newsItem.url); }}>
                    <img
                      className="d-block w-100 ad-banner-image"
                      src={`https://bachkhoi.online/static/${newsItem.image}`}
                      alt={newsItem.title}
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Row>
          {size > 1 &&
            <CarouselButton isLeft={false} onClick={onNextClick} />
          }
        </div>
        {size <= 1 &&
          <div className='d-flex justify-content-center mt-3'>
            <Stack direction='horizontal' gap={3}>
              <CarouselButton isLeft={true} onClick={onPrevClick} isAbsolute={false} />
              <CarouselButton isLeft={false} onClick={onNextClick} isAbsolute={false} />
            </Stack>
          </div>
        }
      </Container>
    </div>
  );
};

export default AdBanner;
