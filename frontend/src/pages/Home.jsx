import React from 'react';
import { FaBookOpen, FaGraduationCap, FaSchool } from 'react-icons/fa';

export default function Admin() {
    return (
        <div style={containerStyle}>
            <div style={infoBox}>
                <h2 style={{ color: '#007acc' }}>🎓 Welcome to the British International School's BTEC Portal</h2>
                <p>
                    The <strong>BTEC (Business and Technology Education Council)</strong> program is a UK-based
                    vocational qualification that emphasizes practical, real-world skills over traditional
                    examinations. At the British international School, we offer BTEC programs to help students
                    succeed in both academic and professional environments.
                </p>
                <p>
                    Through this portal, educators can manage student data, upload course materials, and track
                    academic progress. Students can access resources, submit work, and monitor their achievements.
                </p>
            </div>

            <div style={highlightsStyle}>
                <HighlightCard
                    icon={<FaBookOpen />}
                    title="Practical Curriculum"
                    description="Focus on real-world applications and projects that mirror industry standards."
                />
                <HighlightCard
                    icon={<FaGraduationCap />}
                    title="Global Recognition"
                    description="BTEC qualifications are respected by universities and employers worldwide."
                />
                <HighlightCard
                    icon={<FaSchool />}
                    title="Empowered Learning"
                    description="Supportive learning environment to prepare students for future careers."
                />
            </div>
        </div>
    );
}

function HighlightCard({ icon, title, description }) {
    return (
        <div style={cardStyle}>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{icon}</div>
            <h4 style={{ margin: '10px 0' }}>{title}</h4>
            <p>{description}</p>
        </div>
    );
}

// ✅ Styling
const containerStyle = {
    padding: '30px',
    maxWidth: '1000px',
    margin: '0 auto'
};

const infoBox = {
    background: '#f0f8ff',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
};

const highlightsStyle = {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
};

const cardStyle = {
    flex: '1',
    minWidth: '250px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
};
