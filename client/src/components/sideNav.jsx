import React from 'react';

const SideNav = ({ headings }) => {
  return (
    <div style={{ top: 0, right: 0, paddingRight: 70, position: 'sticky', textAlign: 'left', borderLeft: '2px solid rgb(0, 51, 141)', height: 290 }}>
      <h3 style={{ paddingLeft: 38, fontSize: 16 }}>On this Page</h3>
      <ul>
        {headings.map((heading) => (
          <h5 key={heading.id}>
            <a style={{
              textDecoration: 'none', color: 'black',
              fontWeight: 'normal',
              transition: 'font-weight 0.3s',
            }} href={`#${heading.id}`}
              onMouseOver={(e) => (e.target.style.color = 'rgb(45,93,154)')}
              onMouseOut={(e) => (e.target.style.color = 'black')}
            >
              <span
                style={{
                  color: 'transparent',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  visibility: 'hidden',
                }}
              >
                {heading.text}
              </span>
              {heading.text}</a>
          </h5>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;



