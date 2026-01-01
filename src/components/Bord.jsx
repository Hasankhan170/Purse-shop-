import React, { useState, useEffect } from 'react';

const Board = () => {
  const [time, setTime] = useState(10);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [history, setHistory] = useState([]);
  const [roundNumber, setRoundNumber] = useState(1);
  const [currentPattern, setCurrentPattern] = useState([]);
  
  // Slots with correct order and multipliers
  const slots = [
    { team: 'Quetta', logo: '🏏', multiplier: 2, chipColor: '#800080' },
    { team: 'Zalmi', logo: '🟡', multiplier: 5, chipColor: '#ffff00' },
    { team: 'Multan', logo: '🟢', multiplier: 10, chipColor: '#00ff00' },
    { team: 'Lahore', logo: '🦅', multiplier: 15, chipColor: '#ff00ff' },
    { team: 'Karachi', logo: '🔵', multiplier: 20, chipColor: '#0000ff' },
    { team: 'ISL', logo: '⚫', multiplier: 25, chipColor: '#ffffff' },
    { team: 'PSL', logo: '🏆', multiplier: 30, chipColor: '#ff9900' },
    { team: 'PAK', logo: '🇵🇰', multiplier: 40, chipColor: '#008000' },
  ];
  
  // Function to generate random pattern (like real app)
  const generateRandomPattern = () => {
    const patterns = [
      // Pattern 1: Mostly Quetta with some variations
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 3, 4, 0, 0],
      // Pattern 2: Mixed pattern
      [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3],
      // Pattern 3: Streaks
      [0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7],
      // Pattern 4: Random
      [0, 7, 1, 6, 2, 5, 3, 4, 0, 7, 1, 6, 2, 5, 3, 4, 0, 7, 1, 6],
      // Pattern 5: High frequency low multipliers
      [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
      // Pattern 6: Balanced
      [0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 0, 1, 0, 2, 0, 3],
    ];
    return patterns[Math.floor(Math.random() * patterns.length)];
  };

  // Initialize
  useEffect(() => {
    const initialPattern = generateRandomPattern();
    setCurrentPattern(initialPattern);
    setHistory(initialPattern.slice(0, 20));
  }, []);

  // Timer and pattern change
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev > 1) {
          return prev - 1;
        } else {
          // Time's up - generate new winner
          const nextIndex = (roundNumber - 1) % 8;
          const winnerIndex = Math.floor(Math.random() * 8);
          
          // Show winner
          setSelectedSlot(winnerIndex);
          
          // Update history
          setHistory(prevHistory => {
            const newHistory = [winnerIndex, ...prevHistory.slice(0, 19)];
            
            // Change pattern every 5 rounds (like real app)
            if (roundNumber % 5 === 0) {
              const newPattern = generateRandomPattern();
              setCurrentPattern(newPattern);
            }
            
            return newHistory;
          });
          
          // Increment round
          setRoundNumber(prev => prev + 1);
          
          // Show result for 4 seconds then reset
          setTimeout(() => {
            setSelectedSlot(null);
            setTime(10);
          }, 4000);
          
          return 0;
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [roundNumber]);

  const players = [
    { name: 'RabiaOra...', score: 56377, avatar: '👩' },
    { name: 'PakPati...', score: 30598, avatar: '🧔' },
    { name: '10119454...', score: 47442, avatar: '👩' },
    { name: 'Haroon', score: 284.93, avatar: '🧔' },
    { name: 'MoizJabb...', score: 72858, avatar: '🧔' },
  ];

  const betAmounts = [20, 50, 100, 200, 500];

  // Get trend color
  const getTrendColor = (index) => {
    const colors = [
      '#800080', // Quetta
      '#ffff00', // Zalmi
      '#00ff00', // Multan
      '#ff00ff', // Lahore
      '#0000ff', // Karachi
      '#ffffff', // ISL
      '#ff9900', // PSL
      '#008000', // PAK
    ];
    return colors[index];
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0a0a2a 0%, #000000 100%)',
      color: '#ffd700',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      borderRadius: '20px',
      maxWidth: '1200px',
      margin: 'auto',
      boxShadow: '0 0 50px rgba(255,215,0,0.2)',
    }}>
      
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '10px 20px',
        background: 'rgba(17, 34, 68, 0.8)',
        borderRadius: '15px',
        border: '2px solid #ffd700'
      }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
          🏏 CRICKET BATTLE
        </div>
        
        <div style={{
          textAlign: 'center',
          fontSize: '28px',
          fontWeight: 'bold',
          background: selectedSlot !== null ? '#990000' : '#112244',
          padding: '15px 40px',
          borderRadius: '12px',
          border: '3px solid #ffd700',
          boxShadow: selectedSlot !== null ? '0 0 30px #ff0000' : '0 0 20px #ffd700',
          transition: 'all 0.5s ease',
          minWidth: '300px'
        }}>
          {selectedSlot !== null ? '🎊 WINNER! 🎊' : `⏳ BETTING TIME: ${time}s`}
        </div>
        
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
          ROUND #{roundNumber}
        </div>
      </div>

      {/* TREND CHART - Changes with every pattern */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.7)',
        border: '3px solid #ffd700',
        borderRadius: '15px',
        padding: '20px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <div style={{ 
          fontSize: '22px', 
          fontWeight: 'bold', 
          marginBottom: '15px',
          color: '#ffd700',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          📊 LIVE TREND CHART
        </div>
        
        <div style={{ 
          fontSize: '16px', 
          marginBottom: '20px', 
          fontWeight: 'bold',
          color: '#fff'
        }}>
          RECORD FROM LAST 20 ROUNDS
        </div>
        
        {/* Trend Chart Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: '8px',
          marginBottom: '20px',
          padding: '15px',
          background: 'rgba(17, 34, 68, 0.6)',
          borderRadius: '10px',
          border: '2px solid #444'
        }}>
          {history.slice(0, 20).map((winIdx, i) => (
            <div key={i} style={{
              background: getTrendColor(winIdx),
              borderRadius: '8px',
              padding: '12px 5px',
              textAlign: 'center',
              position: 'relative',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              border: i === 0 ? '3px solid #00ff00' : '1px solid #000',
              transform: i === 0 ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontSize: '20px', marginBottom: '5px' }}>
                {slots[winIdx].logo}
              </div>
              <div style={{ 
                fontSize: '11px', 
                color: '#000',
                fontWeight: 'bold'
              }}>
                {slots[winIdx].team}
              </div>
              <div style={{ 
                fontSize: '10px', 
                color: '#000',
                opacity: 0.8
              }}>
                x{slots[winIdx].multiplier}
              </div>
              {i === 0 && (
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#00ff00',
                  color: '#000',
                  fontSize: '10px',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  animation: 'blink 1s infinite'
                }}>
                  NEW
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Pattern Info */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          background: 'rgba(0, 34, 68, 0.8)',
          padding: '15px',
          borderRadius: '10px',
          border: '1px solid #444'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#aaa' }}>Pattern Changes</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#00ff00' }}>
              Every 5 Rounds
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#aaa' }}>Current Pattern</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffff00' }}>
              #{Math.floor((roundNumber - 1) / 5) + 1}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#aaa' }}>Next Change</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#00ffff' }}>
              {5 - (roundNumber % 5 || 5)} Rounds
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Left Column */}
        <div style={{ width: '200px' }}>
          {/* Players */}
          <div style={{
            background: 'linear-gradient(to bottom, #112233, #001122)',
            border: '2px solid #444',
            borderRadius: '15px',
            padding: '15px',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '16px', marginBottom: '15px', fontWeight: 'bold', textAlign: 'center' }}>
              👥 LIVE PLAYERS
            </div>
            {players.map((p, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '12px', 
                background: i < 3 ? 'rgba(255,215,0,0.1)' : 'rgba(255,255,255,0.05)',
                padding: '10px',
                borderRadius: '8px',
                border: i < 3 ? '1px solid #ffd700' : '1px solid #333'
              }}>
                <div style={{ 
                  fontSize: '24px', 
                  marginRight: '10px',
                  background: '#333',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {p.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{p.name}</div>
                  <div style={{ color: i < 3 ? '#ffff00' : '#aaa', fontSize: '12px' }}>
                    💰 {p.score.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Column - Slots */}
        <div style={{ flex: 1 }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '15px',
            marginBottom: '20px'
          }}>
            {slots.map((slot, idx) => (
              <div
                key={idx}
                style={{
                  background: selectedSlot === idx ? 
                    'radial-gradient(circle, #00ff00 0%, #00aa00 100%)' : 
                    'linear-gradient(135deg, #002244 0%, #001133 100%)',
                  border: selectedSlot === idx ? 
                    '4px solid #ffff00' : 
                    `3px solid ${slot.chipColor}`,
                  borderRadius: '15px',
                  padding: '25px 15px',
                  textAlign: 'center',
                  boxShadow: selectedSlot === idx ? 
                    '0 0 50px #00ff00, inset 0 0 30px #ffff00' : 
                    `0 10px 25px rgba(0,0,0,0.5), 0 0 15px ${slot.chipColor}40`,
                  transition: 'all 0.5s ease',
                  transform: selectedSlot === idx ? 'scale(1.1)' : 'scale(1)',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  if (time > 0 && time < 10) {
                    console.log(`Bet placed on ${slot.team}`);
                  }
                }}
              >
                <div style={{ 
                  fontSize: '60px', 
                  marginBottom: '15px',
                  filter: selectedSlot === idx ? 'drop-shadow(0 0 15px white)' : 'none'
                }}>
                  {slot.logo}
                </div>
                
                <div style={{ 
                  color: selectedSlot === idx ? '#000' : slot.chipColor, 
                  fontWeight: 'bold', 
                  fontSize: '18px',
                  marginBottom: '10px',
                  textShadow: selectedSlot === idx ? '0 0 10px #fff' : 'none'
                }}>
                  {slot.team}
                </div>
                
                <div style={{
                  background: slot.chipColor,
                  color: '#000',
                  borderRadius: '50%',
                  width: '70px',
                  height: '70px',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '22px',
                  boxShadow: selectedSlot === idx ? 
                    '0 0 30px #fff, inset 0 0 15px #000' : 
                    `0 0 20px ${slot.chipColor}`,
                  border: '4px solid #ffd700'
                }}>
                  x{slot.multiplier}
                </div>
                
                {selectedSlot === idx && (
                  <>
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: '#ff0000',
                      color: '#fff',
                      fontSize: '12px',
                      padding: '5px 10px',
                      borderRadius: '15px',
                      fontWeight: 'bold',
                      animation: 'blink 1s infinite',
                      zIndex: 10
                    }}>
                      🎯 WINNER!
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'radial-gradient(circle, transparent 30%, rgba(255,255,0,0.3) 70%)',
                      animation: 'pulse 2s infinite'
                    }} />
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Pattern Display */}
          <div style={{
            background: 'rgba(0, 34, 68, 0.8)',
            border: '2px solid #ff9900',
            borderRadius: '15px',
            padding: '15px',
            marginTop: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#ff9900' }}>
              🎲 CURRENT PATTERN (Changes Randomly)
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', flexWrap: 'wrap' }}>
              {currentPattern.slice(0, 10).map((idx, i) => (
                <div key={i} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '5px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '5px',
                  minWidth: '40px'
                }}>
                  <div style={{ fontSize: '18px' }}>{slots[idx].logo}</div>
                  <div style={{ fontSize: '9px', color: '#ffd700' }}>
                    {slots[idx].team}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '12px', color: '#aaa', marginTop: '10px' }}>
              Pattern changes automatically like real betting app
            </div>
          </div>
        </div>

        {/* Right Column - Betting */}
        <div style={{ width: '250px' }}>
          <div style={{
            background: 'linear-gradient(to bottom, #112244, #001133)',
            border: '2px solid #ffd700',
            borderRadius: '15px',
            padding: '20px'
          }}>
            <div style={{ 
              fontSize: '18px', 
              marginBottom: '20px', 
              fontWeight: 'bold', 
              textAlign: 'center',
              color: '#ffd700'
            }}>
              💰 BETTING PANEL
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '20px',
              padding: '10px',
              background: 'rgba(255,215,0,0.1)',
              borderRadius: '10px',
              border: '1px solid #ffd700'
            }}>
              <div style={{ fontSize: '30px', marginRight: '10px' }}>🧔</div>
              <div>
                <div style={{ fontSize: '12px', color: '#aaa' }}>You</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Player101</div>
                <div style={{ fontSize: '16px', color: '#00ff00', fontWeight: 'bold' }}>
                  💰 132.04
                </div>
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '14px', marginBottom: '10px', color: '#aaa' }}>
                Bet Amount:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {betAmounts.map((amt, i) => (
                  <button
                    key={i}
                    style={{
                      flex: '1',
                      minWidth: '70px',
                      background: i === 0 ? '#00ffff' : 
                                i === 1 ? '#ffff00' : 
                                i === 2 ? '#ffffff' : 
                                i === 3 ? '#888888' : '#cccccc',
                      color: '#000',
                      borderRadius: '10px',
                      padding: '12px 5px',
                      border: '2px solid #ffd700',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      cursor: 'pointer'
                    }}
                  >
                    {amt}
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '14px', marginBottom: '10px', color: '#aaa' }}>
                Quick Bet:
              </div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <button style={{
                  flex: 1,
                  background: '#00aa00',
                  color: '#fff',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '2px solid #00ff00',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  MIN
                </button>
                <button style={{
                  flex: 1,
                  background: '#aa0000',
                  color: '#fff',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '2px solid #ff0000',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  MAX
                </button>
              </div>
            </div>
            
            <button style={{
              width: '100%',
              background: 'linear-gradient(45deg, #00aa00, #008800)',
              color: '#fff',
              padding: '15px',
              borderRadius: '12px',
              border: 'none',
              fontWeight: 'bold',
              fontSize: '18px',
              cursor: 'pointer',
              marginTop: '10px'
            }}>
              🎯 PLACE BET
            </button>
            
            <button style={{
              width: '100%',
              background: 'linear-gradient(45deg, #ff6600, #ff3300)',
              color: '#fff',
              padding: '12px',
              borderRadius: '12px',
              border: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '10px'
            }}>
              🔄 REBET
            </button>
          </div>
          
          {/* Next Prediction */}
          <div style={{
            background: 'linear-gradient(to bottom, #003300, #001100)',
            border: '2px solid #00ff00',
            borderRadius: '15px',
            padding: '15px',
            marginTop: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', color: '#00ff00' }}>
              🔮 NEXT PREDICTION
            </div>
            <div style={{ fontSize: '36px', marginBottom: '10px' }}>
              {slots[Math.floor(Math.random() * slots.length)].logo}
            </div>
            <div style={{ fontSize: '14px', color: '#aaa', marginTop: '5px' }}>
              Based on current pattern
            </div>
          </div>
        </div>
      </div>

      {/* Live Status */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: 'rgba(0, 17, 34, 0.9)',
        borderRadius: '10px',
        border: '2px solid #ffd700',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '14px', color: '#ffd700', marginBottom: '5px' }}>
          ⚡ LIVE STATUS
        </div>
        <div style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: time < 5 ? '#ff0000' : time < 8 ? '#ffff00' : '#00ff00'
        }}>
          {time > 0 ? `BETTING OPEN - ${time}s LEFT` : 'RESULT SHOWING'}
        </div>
        <div style={{ fontSize: '12px', color: '#aaa', marginTop: '10px' }}>
          Pattern changes automatically • Next change in {5 - (roundNumber % 5 || 5)} rounds
        </div>
      </div>

      <style>
        {`
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); opacity: 0.8; }
          }
        `}
      </style>
    </div>
  );
};

export default Board;