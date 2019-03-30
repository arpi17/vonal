import React from 'react';

import Footer from '../components/common/Footer';
import RoutesMain from '../components/main/RoutesMain';
import SectionTitle from '../components/text/SectionTitle';
import LinkText from '../components/text/LinkText';
import Para from '../components/text/Para';
import ContactContainer from '../components/layout/ContactContainer';
import ContactItem from '../components/layout/ContactItem';

function Contact() {
  return (
    <React.Fragment>
      <RoutesMain minHeight="80vh">
        <SectionTitle>Contact</SectionTitle>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Para>
            Should you have any questions, feedback or if you would like to
            report a bug you can visit the{' '}
            <a
              href="https://github.com/arpi17/vonal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkText>Github page</LinkText>
            </a>{' '}
            of the app or contact me directly in the following ways:
          </Para>
          <ContactContainer>
            <ContactItem>
              <a
                href="https://www.linkedin.com/in/arpadillyes/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkText>
                  <i className="fab fa-linkedin fa-3x" />
                </LinkText>
              </a>
            </ContactItem>
            <ContactItem>
              <a
                href="https://github.com/arpi17"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkText>
                  <i className="fab fa-github fa-3x" />
                </LinkText>
              </a>
            </ContactItem>
            <ContactItem>
              <a
                href="https://twitter.com/a_illyes"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkText>
                  <i className="fab fa-twitter fa-3x" />
                </LinkText>
              </a>
            </ContactItem>
            <ContactItem>
              <address>
                <a
                  href="mailto:arpadillyes93@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkText>
                    <i className="far fa-envelope fa-3x" />
                  </LinkText>
                </a>
              </address>
            </ContactItem>
          </ContactContainer>
        </div>
      </RoutesMain>
      <Footer />
    </React.Fragment>
  );
}

export default Contact;
