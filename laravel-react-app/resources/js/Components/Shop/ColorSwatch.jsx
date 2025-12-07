export default function ColorSwatch({ color, label, selected, onClick }) {
    const colorClasses = {
        'Black': 'bg-black',
        'White': 'bg-white border-gray-300',
        'Brown': 'bg-amber-700',
        'Navy': 'bg-blue-900',
        'Grey': 'bg-gray-500',
        'Red': 'bg-red-600',
        'Blue': 'bg-blue-600',
        'Aqua Blue': 'bg-cyan-500',
        'Baby Pink': 'bg-pink-300',
        'Beige': 'bg-amber-200',
    };

    return (
        <button
            onClick={onClick}
            className={`w-8 h-8 rounded-full border-2 ${selected ? 'border-black ring-2 ring-offset-2 ring-gray-300' : 'border-gray-200'
                } ${colorClasses[color] || 'bg-gray-300'} transition`}
            title={label || color}
        />
    );
}
